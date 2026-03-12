import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaxRegime } from '@prisma/client';

@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  async getEmployeeDeclaration(employeeId: string, year: number) {
    return this.prisma.taxDeclaration.findFirst({
      where: { employeeId, year },
    });
  }

  async updateDeclaration(
    employeeId: string,
    dto: {
      regime: TaxRegime;
      investments80C: number;
      investments80D: number;
      hraAmount: number;
      otherIncome: number;
      year: number;
    },
  ) {
    return this.prisma.taxDeclaration.create({
      data: { ...dto, employeeId },
    });
  }

  async verifyDeclaration(id: string, isVerified: boolean) {
    return this.prisma.taxDeclaration.update({
      where: { id },
      data: { isVerified },
    });
  }

  /**
   * Advanced TDS calculation reflecting tax declarations.
   */
  calculateEffectiveTaxableIncome(monthlyGross: number, declaration?: any) {
    if (!declaration) return monthlyGross * 12;

    const annualGross = monthlyGross * 12;

    // Old regime allows deductions
    if (declaration.regime === TaxRegime.OLD) {
      // Explicitly cast and provide default values for safety
      const investments80C = Number(declaration.investments80C || 0);
      const investments80D = Number(declaration.investments80D || 0);
      const hraAmount = Number(declaration.hraAmount || 0);

      const deductions =
        Math.min(investments80C, 150000) + // capped at 1.5L
        Math.min(investments80D, 25000) + // capped at 25k (general)
        hraAmount;
      return Math.max(0, annualGross - deductions);
    }

    // New regime (simplified for FY 25-26) usually doesn't allow these deductions
    return annualGross;
  }
}
