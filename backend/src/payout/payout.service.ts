import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PayoutStatus } from '@prisma/client';

@Injectable()
export class PayoutService {
  constructor(private prisma: PrismaService) { }

  async initiatePayoutBatch(orgId: string, payrollRunId: string) {
    // 1. Verify payroll run
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: payrollRunId },
      include: { items: true }
    });

    if (!run) throw new NotFoundException('Payroll run not found');
    if (run.orgId !== orgId) throw new BadRequestException('Not authorized for this payroll run');

    // Check if already paid
    const existingBatch = await this.prisma.payoutBatch.findFirst({
      where: { payrollRunId, status: { in: [PayoutStatus.SUCCESS, PayoutStatus.PROCESSING] } }
    });
    if (existingBatch) throw new BadRequestException('Payout already initiated or completed for this run');

    // 2. Create Payout Batch
    const batch = await this.prisma.payoutBatch.create({
      data: {
        orgId,
        payrollRunId,
        totalAmount: run.totalNetPay,
        status: PayoutStatus.PROCESSING,
        items: {
          create: run.items.map(item => ({
            payrollRunItemId: item.id,
            status: PayoutStatus.PENDING,
          }))
        }
      },
      include: { items: true }
    });

    // 3. Simulate Async Bank Processing
    this.simulateBankTransfer(batch.id);

    return batch;
  }

  private async simulateBankTransfer(batchId: string) {
    // AI logic: Artificial delay to simulate banking rails
    setTimeout(async () => {
      try {
        // Bulk update items to SUCCESS
        await this.prisma.payoutItem.updateMany({
          where: { batchId },
          data: { status: PayoutStatus.SUCCESS, externalId: `TXN-${Math.random().toString(36).substring(7).toUpperCase()}` }
        });

        // Update batch status
        await this.prisma.payoutBatch.update({
          where: { id: batchId },
          data: {
            status: PayoutStatus.SUCCESS,
            externalBatchId: `B-${Date.now()}`
          }
        });
      } catch (error) {
        console.error('Payout simulation failed:', error);
      }
    }, 5000); // 5 second delay for "Elite" feel
  }

  async getHistory(orgId: string) {
    return this.prisma.payoutBatch.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        payrollRun: true,
        _count: { select: { items: true } }
      }
    });
  }

  async getBatchDetails(batchId: string) {
    return this.prisma.payoutBatch.findUnique({
      where: { id: batchId },
      include: {
        items: {
          include: {
            payrollRunItem: {
              include: {
                employee: true
              }
            }
          }
        }
      }
    });
  }
}
