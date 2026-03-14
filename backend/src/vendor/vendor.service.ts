import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';

interface CreatePaymentDto {
  amount: number;
  tdsRate?: number;
  remarks?: string;
  paymentDate?: string;
}

interface CreateBulkPaymentItemDto {
  vendorId: string;
  amount: number;
  remarks?: string;
}

@Injectable()
export class VendorService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  async listVendors(orgId: string) {
    return this.prisma.vendor.findMany({
      where: { orgId, deletedAt: null },
      include: {
        _count: {
          select: { payments: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async createVendor(orgId: string, dto: any) {
    return this.prisma.vendor.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        pan: dto.pan,
        gstin: dto.gstin,
        bankAccount: dto.bankAccount,
        ifsc: dto.ifsc,
        orgId,
      },
    });
  }

  async createPayment(orgId: string, vendorId: string, dto: CreatePaymentDto) {
    const amount = Number(dto.amount);
    const tdsRate = parseFloat(dto.tdsRate as any) || 0.01;
    const tdsAmount = amount * tdsRate;
    const netAmount = amount - tdsAmount;

    // Orchestrate Wallet Payout
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.vendorPayment.create({
        data: {
          vendorId,
          orgId,
          amount,
          tdsRate: tdsRate * 100,
          tdsAmount,
          netAmount,
          remarks: dto.remarks,
          paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
          status: 'SUCCESS',
        },
      });

      await this.walletService.processPayout(
        orgId,
        netAmount,
        'VENDOR',
        `Vendor Settlement: ${payment.id}`,
        payment.id,
      );

      return payment;
    });
  }

  async createBulkPayments(orgId: string, dto: CreateBulkPaymentItemDto[]) {
    if (!dto.length) throw new BadRequestException('No payments provided');

    const totalAmount = dto.reduce((sum, p) => sum + p.amount, 0);

    return this.prisma.$transaction(async (tx) => {
      // 1. Create Batch Header
      const batch = await tx.vendorPayoutBatch.create({
        data: {
          orgId,
          totalAmount,
          description: `Bulk Vendor Payout (${dto.length} vendors)`,
          status: 'SUCCESS',
        },
      });

      const payoutsToProcess: { amount: number; category: string; description: string; referenceId: string }[] = [];

      // 2. Create individual payments
      for (const p of dto) {
        const tdsRate = 0.01; // Default
        const tdsAmount = p.amount * tdsRate;
        const netAmount = p.amount - tdsAmount;

        const payment = await tx.vendorPayment.create({
          data: {
            vendorId: p.vendorId,
            orgId,
            amount: p.amount,
            tdsRate: tdsRate * 100,
            tdsAmount,
            netAmount,
            remarks: p.remarks,
            batchId: batch.id,
            status: 'SUCCESS',
          },
        });

        payoutsToProcess.push({
          amount: netAmount,
          category: 'VENDOR',
          description: `Bulk Settlement: ${p.vendorId}`,
          referenceId: payment.id,
        });
      }

      // 3. Process from wallet
      await this.walletService.processBulkPayout(orgId, payoutsToProcess);

      return batch;
    });
  }

  async listPayments(orgId: string) {
    return this.prisma.vendorPayment.findMany({
      where: { orgId },
      include: {
        vendor: true,
      },
      orderBy: { paymentDate: 'desc' },
    });
  }
}
