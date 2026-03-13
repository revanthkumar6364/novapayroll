import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}

  async listVendors(orgId: string) {
    return this.prisma.vendor.findMany({
      where: { orgId, deletedAt: null },
      include: {
        _count: {
          select: { payments: true },
        },
      },
    });
  }

  async createVendor(orgId: string, dto: any) {
    return this.prisma.vendor.create({
      data: {
        ...dto,
        orgId,
      },
    });
  }

  async createPayment(orgId: string, vendorId: string, dto: any) {
    const amount = Number(dto.amount);
    const tdsRate = parseFloat(dto.tdsRate) || 0.01;
    const tdsAmount = amount * tdsRate;
    const netAmount = amount - tdsAmount;

    return this.prisma.vendorPayment.create({
      data: {
        vendorId,
        orgId,
        amount,
        tdsRate: tdsRate * 100,
        tdsAmount,
        netAmount,
        remarks: dto.remarks,
        paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
        status: 'SUCCESS', // Simulate success for Elite feel
      },
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
