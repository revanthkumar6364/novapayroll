import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(orgId: string) {
    const activeEmployees = await this.prisma.employee.count({
      where: { orgId, status: 'ACTIVE', deletedAt: null },
    });

    const latestRun = await this.prisma.payrollRun.findFirst({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });

    const pendingReimbursements =
      await this.prisma.reimbursementRequest.aggregate({
        where: { orgId, status: 'ACTIVE' },
        _sum: { amount: true },
      });

    // Calculate total liability (last run)
    const totalLiability = latestRun
      ? latestRun.totalEarnings +
        (latestRun.totalDeductions - latestRun.totalNetPay)
      : 0; // simplistic approx

    return {
      activeEmployees,
      totalLiability: latestRun?.totalEarnings || 0,
      totalNetPay: latestRun?.totalNetPay || 0,
      pendingReimbursements: pendingReimbursements._sum.amount || 0,
      nextPayrollDate: '2026-03-31', // Mock
    };
  }

  async getPayrollTrends(orgId: string) {
    const runs = await this.prisma.payrollRun.findMany({
      where: { orgId },
      orderBy: { createdAt: 'asc' },
      take: 6,
      select: { month: true, year: true, totalNetPay: true },
    });

    return runs.map((r) => ({
      period: `${r.month}/${r.year}`,
      amount: r.totalNetPay / 100, // convert paise to INR
    }));
  }
}
