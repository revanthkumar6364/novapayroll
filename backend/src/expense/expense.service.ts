import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class ExpenseService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  async createRequest(orgId: string, employeeId: string, data: { amount: number; description: string; attachments?: any }) {
    return this.prisma.reimbursementRequest.create({
      data: {
        orgId,
        employeeId,
        amount: data.amount,
        description: data.description,
        attachments: data.attachments || {},
        status: 'PENDING',
      },
    });
  }

  async getRequests(orgId: string) {
    return this.prisma.reimbursementRequest.findMany({
      where: { orgId },
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveRequest(userId: string, orgId: string, requestId: string) {
    const request = await this.prisma.reimbursementRequest.findUnique({
      where: { id: requestId },
    });

    if (!request || request.orgId !== orgId) {
      throw new NotFoundException('Reimbursement request not found');
    }

    // Process Payout via Wallet
    await this.walletService.processPayout(
      orgId,
      request.amount,
      'REIMBURSEMENT',
      `Reimbursement: ${request.description}`,
      request.id,
    );

    return this.prisma.reimbursementRequest.update({
      where: { id: requestId },
      data: {
        status: 'ACTIVE', // Using ACTIVE as 'Approved' based on enum mapping or custom status
        approvedAt: new Date(),
      },
    });
  }

  async getMyRequests(employeeId: string) {
    return this.prisma.reimbursementRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
