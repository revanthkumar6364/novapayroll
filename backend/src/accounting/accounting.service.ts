import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async generateTallyExport(orgId: string, startDate: Date, endDate: Date) {
    const payments = await this.prisma.vendorPayment.findMany({
      where: {
        orgId,
        paymentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { vendor: true },
    });

    await this.prisma.payrollRun.findMany({
      where: {
        orgId,
        month: {
          gte: startDate.getMonth() + 1, // Simplified
        },
        status: 'PAID',
      },
    });

    // Mock CSV generation for "Elite" feel
    const headers = [
      'Date',
      'Type',
      'Account',
      'Voucher Type',
      'Amount',
      'Remarks',
    ];
    const rows = payments.map((p) => [
      p.paymentDate.toISOString().split('T')[0],
      'Payment',
      p.vendor.name,
      'Bank Payment',
      p.netAmount,
      p.remarks || 'Vendor Settlement',
    ]);

    return [headers, ...rows].map((e) => e.join(',')).join('\n');
  }

  async generateZohoExport(orgId: string, startDate: Date, endDate: Date) {
    const transactions = await this.prisma.walletTransaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        wallet: { orgId },
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Transaction Date',
      'Description',
      'Amount',
      'Transaction Type',
      'Account Name',
    ];
    const rows = transactions.map((t) => [
      t.createdAt.toISOString().split('T')[0],
      t.description || t.category,
      t.amount,
      t.type === 'CREDIT' ? 'Deposit' : 'Expense',
      'Nova Wallet',
    ]);

    return [headers, ...rows].map((e) => e.join(',')).join('\n');
  }
}
