import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getWallet(orgId: string) {
    let wallet = await this.prisma.wallet.findUnique({
      where: { orgId },
      include: { transactions: { take: 10, orderBy: { createdAt: 'desc' } } },
    });

    if (!wallet) {
      // Auto-create wallet if missing
      wallet = await this.prisma.wallet.create({
        data: { orgId, balance: 1000000.0 }, // Start with a demo balance
        include: { transactions: true },
      });
    }

    return wallet;
  }

  async deposit(orgId: string, amount: number, description: string) {
    const wallet = await this.getWallet(orgId);

    return this.prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: amount } },
      });

      return tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'CREDIT',
          category: 'TOPUP',
          description,
          status: 'SUCCESS',
        },
      });
    });
  }

  async processPayout(
    orgId: string,
    amount: number,
    category: string,
    description: string,
    referenceId?: string,
  ) {
    const wallet = await this.getWallet(orgId);

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient wallet balance');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: amount } },
      });

      return tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'DEBIT',
          category,
          description,
          referenceId,
          status: 'SUCCESS',
        },
      });
    });
  }

  async getTransactions(orgId: string) {
    const wallet = await this.getWallet(orgId);
    return this.prisma.walletTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async processBulkPayout(
    orgId: string,
    payouts: {
      amount: number;
      category: string;
      description: string;
      referenceId?: string;
    }[],
  ) {
    const wallet = await this.getWallet(orgId);
    const totalAmount = payouts.reduce((sum, p) => sum + p.amount, 0);

    if (wallet.balance < totalAmount) {
      throw new BadRequestException(
        'Insufficient wallet balance for bulk payout',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Deduct total from wallet
      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: totalAmount } },
      });

      // 2. Create high-precision ledger entries for each payout
      return Promise.all(
        payouts.map((p) =>
          tx.walletTransaction.create({
            data: {
              walletId: wallet.id,
              amount: p.amount,
              type: 'DEBIT',
              category: p.category,
              description: p.description,
              referenceId: p.referenceId,
              status: 'SUCCESS',
            },
          }),
        ),
      );
    });
  }

  async processBulkPayoutSimulation(
    orgId: string,
    payouts: { id: string; amount: number }[],
    type: string,
    mode: string,
  ) {
    const wallet = await this.getWallet(orgId);
    const totalAmount = payouts.reduce((sum, p) => sum + p.amount, 0);

    if (wallet.balance < totalAmount) {
      throw new BadRequestException('Insufficient wallet balance');
    }

    if (mode === 'PRODUCTION') {
      await this._simulateProductionBankHandshake(totalAmount);
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: totalAmount } },
      });

      return Promise.all(
        payouts.map((p) =>
          tx.walletTransaction.create({
            data: {
              walletId: wallet.id,
              amount: p.amount,
              type: 'DEBIT',
              category: type === 'VENDOR' ? 'VENDOR_PAYMENT' : 'PAYROLL',
              description: `Bulk ${type.toLowerCase()} payout via ${mode} API`,
              referenceId: p.id,
              status: 'SUCCESS',
            },
          }),
        ),
      );
    });
  }

  private async _simulateProductionBankHandshake(total: number) {
    console.log(`[BANK_API] Initiating PRODUCTION handshake for ₹${total}`);
    console.log(`[BANK_API] Verifying ICICI/HDFC API Tokens...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`[BANK_API] Handshake Success. Dispatching funds.`);
  }
}
