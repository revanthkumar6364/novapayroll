import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { PayrollStatus, Status } from '@prisma/client';
import * as compliance from './compliance.utils';

interface PayrollComponent {
  [key: string]: number;
}

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async listRuns(orgId: string) {
    return this.prisma.payrollRun.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createRun(orgId: string, dto: CreatePayrollRunDto) {
    const existing = await this.prisma.payrollRun.findFirst({
      where: { orgId, month: dto.month, year: dto.year },
    });

    if (existing) {
      throw new BadRequestException(
        'Payroll run already exists for this period',
      );
    }

    return this.prisma.payrollRun.create({
      data: {
        orgId,
        month: dto.month,
        year: dto.year,
        type: dto.type || 'REGULAR',
        status: PayrollStatus.DRAFT,
      },
    });
  }

  async calculateRun(runId: string) {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: runId },
      include: { org: true },
    });

    if (!run) throw new NotFoundException('Run not found');
    if (run.status === PayrollStatus.LOCKED) {
      throw new BadRequestException('Cannot recalculate a locked run');
    }

    const employees = await this.prisma.employee.findMany({
      where: { orgId: run.orgId, status: 'ACTIVE', deletedAt: null },
      include: {
        salaryStructures: {
          orderBy: { effectiveFrom: 'desc' },
          take: 1,
        },
        contractor: true,
        loans: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    const attendancePeriod = await this.prisma.attendancePeriod.findFirst({
      where: { orgId: run.orgId, month: run.month, year: run.year },
      include: { entries: true },
    });

    const reimbursements = await this.prisma.reimbursementRequest.findMany({
      where: {
        orgId: run.orgId,
        status: Status.ACTIVE,
        createdAt: {
          gte: new Date(run.year, run.month - 1, 1),
          lt: new Date(run.year, run.month, 1),
        },
      },
    });

    return this.prisma.$transaction(async (tx) => {
      await tx.payrollRunItem.deleteMany({ where: { payrollRunId: runId } });

      let totalEarnings = 0;
      let totalDeductions = 0;
      let totalNetPay = 0;

      for (const emp of employees) {
        const isContractor = !!emp.contractor;
        const structure = emp.salaryStructures[0];
        if (!structure) continue;

        const gross = structure.grossSalary;
        let totalEarning = 0;
        let totalDeduction = 0;
        let netPay = 0;
        let earnings: PayrollComponent = {};
        let deductions: PayrollComponent = {};

        if (isContractor) {
          // Contractor Logic
          const tds = Math.floor(
            (gross * (emp.contractor?.tdsRate || 0)) / 100,
          );
          earnings = {
            professionalFees: gross,
          };
          deductions = {
            tds: tds,
          };
          totalEarning = gross;
          totalDeduction = tds;
          netPay = gross - tds;
        } else {
          // Regular Employee Logic
          const basic = Math.floor(gross * 0.5);
          const hra = Math.floor(gross * 0.3);
          const allowance = gross - basic - hra;

          const attEntry = attendancePeriod?.entries.find(
            (e) => e.employeeId === emp.id,
          );
          const lopDays = attEntry?.daysLop || 0;
          const dailyRate = Math.floor(gross / 30);
          const lopAmount = lopDays * dailyRate;

          const empReimbursements = reimbursements
            .filter((r) => r.employeeId === emp.id)
            .reduce((sum, r) => sum + r.amount, 0);

          const adjustedGross = gross - lopAmount;
          const pf = compliance.calculatePF(basic);
          const esi = compliance.calculateESI(adjustedGross);
          const pt = compliance.calculatePT(adjustedGross);
          const tds = compliance.calculateMonthlyTDS(adjustedGross);

          earnings = {
            basic,
            hra,
            allowance,
            reimbursement: empReimbursements,
          };
          deductions = {
            lop: lopAmount,
            pf,
            esi,
            pt,
            tds,
          };
          totalEarning = gross + empReimbursements;

          // Loan Recovery
          const loanEmi = emp.loans.reduce((sum, l) => sum + l.monthlyEmi, 0);
          if (loanEmi > 0) {
            deductions.loanRecovery = loanEmi;
          }

          totalDeduction = lopAmount + pf + esi + pt + tds + loanEmi;
          netPay = totalEarning - totalDeduction;
        }

        await tx.payrollRunItem.create({
          data: {
            payrollRunId: runId,
            employeeId: emp.id,
            earnings,
            deductions,
            netPay,
            taxEstimation: deductions.tds || 0,
          },
        });

        totalEarnings += totalEarning;
        totalDeductions += totalDeduction;
        totalNetPay += netPay;
      }

      return tx.payrollRun.update({
        where: { id: runId },
        data: {
          totalEarnings,
          totalDeductions,
          totalNetPay,
          status: PayrollStatus.REVIEW,
        },
      });
    });
  }

  async lockRun(runId: string) {
    return this.prisma.payrollRun.update({
      where: { id: runId },
      data: {
        status: PayrollStatus.LOCKED,
        lockedAt: new Date(),
      },
    });
  }

  async getMyPayslips(userId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { userId },
    });

    if (!employee) {
      throw new NotFoundException('Employee record not found for this user');
    }

    return this.prisma.payrollRunItem.findMany({
      where: { employeeId: employee.id },
      include: {
        payrollRun: true,
      },
      orderBy: {
        payrollRun: {
          year: 'desc',
        },
      },
    });
  }
}
