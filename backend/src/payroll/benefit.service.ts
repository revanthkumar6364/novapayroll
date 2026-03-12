import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BenefitService {
  constructor(private prisma: PrismaService) {}

  async createLoan(
    employeeId: string,
    amount: number,
    tenure: number,
    interestRate = 0,
  ) {
    const monthlyEmi = Math.floor((amount * (1 + interestRate / 100)) / tenure);

    return (this.prisma as any).employeeLoan.create({
      data: {
        employeeId,
        amount,
        interestRate,
        tenureMonths: tenure,
        monthlyEmi,
        remainingAmount: amount,
        status: 'ACTIVE',
      },
    });
  }

  async getActiveLoans(employeeId: string) {
    return (this.prisma as any).employeeLoan.findMany({
      where: { employeeId, status: 'ACTIVE' },
    });
  }

  async enrollBenefit(
    employeeId: string,
    data: {
      provider: string;
      policyNo: string;
      type: string;
      coverageAmount: number;
      premiumAmount: number;
    },
  ) {
    return (this.prisma as any).benefitEnrollment.create({
      data: {
        employeeId,
        ...data,
        status: 'ACTIVE',
      },
    });
  }

  async getEnrollments(employeeId: string) {
    return (this.prisma as any).benefitEnrollment.findMany({
      where: { employeeId, status: 'ACTIVE' },
    });
  }
}
