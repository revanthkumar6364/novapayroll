import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

interface CreateReimbursementDto {
  amount: number;
  description: string;
  attachments?: string[];
}

@Injectable()
export class ReimbursementService {
  constructor(private prisma: PrismaService) {}

  async listRequests(orgId: string, employeeId?: string) {
    return this.prisma.reimbursementRequest.findMany({
      where: {
        orgId,
        ...(employeeId ? { employeeId } : {}),
      },
      select: {
        id: true,
        amount: true,
        description: true,
        attachments: true,
        status: true,
        approvedAt: true,
        createdAt: true,
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createRequest(
    orgId: string,
    employeeId: string,
    dto: CreateReimbursementDto,
  ) {
    return this.prisma.reimbursementRequest.create({
      data: {
        orgId,
        employeeId,
        amount: Number(dto.amount),
        description: dto.description,
        attachments: dto.attachments || [],
        status: Status.PENDING,
      },
    });
  }

  async updateStatus(orgId: string, id: string, status: Status) {
    const request = await this.prisma.reimbursementRequest.findFirst({
      where: { id, orgId },
    });
    if (!request)
      throw new NotFoundException('Reimbursement request not found');

    return this.prisma.reimbursementRequest.update({
      where: { id },
      data: {
        status,
        approvedAt: status.toString() === 'APPROVED' ? new Date() : null,
      },
    });
  }
}
