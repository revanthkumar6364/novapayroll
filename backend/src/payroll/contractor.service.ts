import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractorType } from '@prisma/client';

@Injectable()
export class ContractorService {
  constructor(private prisma: PrismaService) {}

  async onboardContractor(data: {
    employeeId: string;
    type: ContractorType;
    pan: string;
    tdsSectionCode: string; // 194J (10%), 194C (2%)
    bankAccount?: string;
    bankIfsc?: string;
  }) {
    const tdsRate = data.tdsSectionCode === '194J' ? 10.0 : 2.0;

    return this.prisma.contractor.create({
      data: {
        employeeId: data.employeeId,
        type: data.type,
        pan: data.pan,
        tdsSection: data.tdsSectionCode,
        tdsRate,
        bankAccount: data.bankAccount,
        bankIfsc: data.bankIfsc,
      },
    });
  }

  async getContractorDetails(employeeId: string) {
    return this.prisma.contractor.findUnique({
      where: { employeeId },
      include: { employee: true },
    });
  }

  /**
   * Calculates TDS for a contractor payout.
   */
  calculateTDS(baseAmount: number, rate: number) {
    return Math.floor((baseAmount * rate) / 100);
  }
}
