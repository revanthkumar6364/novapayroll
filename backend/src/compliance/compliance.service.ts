import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaxRegime } from '@prisma/client';

interface Earnings {
  basic: number;
  hra?: number;
  allowance?: number;
  [key: string]: number | undefined;
}

interface Deductions {
  pf: number;
  esi: number;
  tds: number;
  lop: number;
  [key: string]: number | undefined;
}

@Injectable()
export class ComplianceService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generates EPFO ECR text format (#~# delimited)
   * Format: UAN#~#Member Name#~#Gross Wages#~#EPF Wages#~#EPS Wages#~#EDLI Wages#~#EPF Contrib Remitted#~#EPS Contrib Remitted#~#Diff EPF and EPS Contrib Remitted#~#NCP Days#~#Refund of Advances
   */
  async generatePfEcr(payrollRunId: string): Promise<string> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: payrollRunId },
      include: {
        items: {
          include: {
            employee: true,
          },
        },
      },
    });

    if (!run) throw new NotFoundException('Payroll run not found');

    const lines = run.items.map((item) => {
      const uan = item.employee.uan || 'NOT_FOUND';
      const name = item.employee.firstName + ' ' + item.employee.lastName;
      const gross = Math.floor(item.netPay / 100); // Simplified for ECR
      const earnings = item.earnings as unknown as Earnings;
      const deductions = item.deductions as unknown as Deductions;
      const wages = Math.floor(earnings.basic / 100);
      const epfContrib = Math.floor(deductions.pf / 100);

      return `${uan}#~#${name}#~#${gross}#~#${wages}#~#${wages}#~#${wages}#~#${epfContrib}#~#0#~#${epfContrib}#~#0#~#0`;
    });

    return lines.join('\n');
  }

  /**
   * Generates ESIC monthly contribution file format
   */
  async generateEsiEcr(payrollRunId: string): Promise<string> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: payrollRunId },
      include: {
        items: {
          include: {
            employee: true,
          },
        },
      },
    });

    if (!run) throw new NotFoundException('Payroll run not found');

    const lines = run.items
      .filter((item) => (item.deductions as unknown as Deductions).esi > 0)
      .map((item) => {
        const esiId = item.employee.esiNumber || 'NOT_FOUND';
        const name = item.employee.firstName + ' ' + item.employee.lastName;
        const deductions = item.deductions as unknown as Deductions;
        const gross = Math.floor((item.netPay + (deductions.lop || 0)) / 100);
        const esiContrib = Math.floor(deductions.esi / 100);

        return `${esiId},${name},1,${gross},0,${esiContrib}`;
      });

    return lines.join('\n');
  }

  /**
   * [ADVANCED] AI Compliance Guard
   * Auditor that checks for statutory and tax anomalies in a payroll run.
   */
  async auditPayroll(payrollRunId: string) {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: payrollRunId },
      include: {
        items: {
          include: {
            employee: {
              include: {
                taxDeclarations: {
                  where: { year: new Date().getFullYear() },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!run) throw new NotFoundException('Payroll run not found');

    const anomalies: any[] = [];

    for (const item of run.items) {
      const earnings = item.earnings as unknown as Earnings;
      const deductions = item.deductions as unknown as Deductions;
      const basic = (earnings.basic || 0) / 100;
      const pf = (deductions.pf || 0) / 100;

      // 1. PF Ceiling Check (Wage > 15k but PF not capped)
      if (basic > 15000 && pf > 1800) {
        anomalies.push({
          employeeId: item.employeeId,
          name: `${item.employee.firstName} ${item.employee.lastName}`,
          type: 'PF_CEILING_BREACH',
          severity: 'MEDIUM',
          message: `PF deduction (₹${pf}) exceeds statutory cap for basic ₹${basic}. Check voluntary contribution status.`,
        });
      }

      // 2. ESI Eligibility Check
      const monthlyGross = (item.netPay + (deductions.lop || 0)) / 100;
      if (monthlyGross > 21000 && (deductions.esi || 0) > 0) {
        anomalies.push({
          employeeId: item.employeeId,
          name: `${item.employee.firstName} ${item.employee.lastName}`,
          type: 'ESI_ELIGIBILITY_ERROR',
          severity: 'HIGH',
          message: `ESI deducted for gross ₹${monthlyGross} which exceeds the ₹21,000 threshold.`,
        });
      }

      // 3. Tax Regime Anomaly
      const declaration = item.employee.taxDeclarations[0];
      const tds = deductions.tds || 0;
      if (
        declaration &&
        declaration.regime === TaxRegime.NEW &&
        tds > 10000 &&
        monthlyGross < 70000
      ) {
        anomalies.push({
          employeeId: item.employeeId,
          name: `${item.employee.firstName} ${item.employee.lastName}`,
          type: 'TAX_SLAB_ANOMALY',
          severity: 'LOW',
          message: `TDS (₹${tds / 100}) seems high for New Tax Regime at income level ₹${monthlyGross}. Verify declarations.`,
        });
      }
    }

    return {
      runId: payrollRunId,
      auditTimestamp: new Date(),
      anomalyCount: anomalies.length,
      anomalies,
      complianceScore: Math.max(0, 100 - anomalies.length * 5),
    };
  }
}
