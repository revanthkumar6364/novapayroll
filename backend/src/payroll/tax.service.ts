import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaxRegime, DeclarationStatus } from '@prisma/client';

@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  async getEmployeeDeclaration(employeeId: string, year: number) {
    return this.prisma.taxDeclaration.findFirst({
      where: { employeeId, year },
      include: { proofs: true },
    });
  }

  async createOrUpdateDeclaration(
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
    const existing = await this.getEmployeeDeclaration(employeeId, dto.year);

    if (existing) {
      if (existing.status === DeclarationStatus.VERIFIED) {
        throw new BadRequestException('Cannot update a verified declaration');
      }
      return this.prisma.taxDeclaration.update({
        where: { id: existing.id },
        data: { ...dto, status: DeclarationStatus.DRAFT },
      });
    }

    return this.prisma.taxDeclaration.create({
      data: { ...dto, employeeId, status: DeclarationStatus.DRAFT },
    });
  }

  async submitForVerification(declarationId: string) {
    return this.prisma.taxDeclaration.update({
      where: { id: declarationId },
      data: { status: DeclarationStatus.PENDING },
    });
  }

  async addProof(
    declarationId: string,
    dto: {
      category: string;
      fileName: string;
      fileUrl: string;
      amount: number;
    },
  ) {
    return this.prisma.taxProof.create({
      data: {
        ...dto,
        declarationId,
        status: DeclarationStatus.PENDING,
      },
    });
  }

  async getAdminVerificationQueue(orgId: string) {
    return this.prisma.taxDeclaration.findMany({
      where: {
        employee: { orgId },
        status: DeclarationStatus.PENDING,
      },
      include: {
        employee: true,
        proofs: true,
      },
    });
  }

  async reviewDeclaration(
    id: string,
    status: DeclarationStatus,
    adminRemarks?: string,
  ) {
    return this.prisma.taxDeclaration.update({
      where: { id },
      data: { status, adminRemarks },
    });
  }

  /**
   * Refined TDS calculation: Uses "Verified" proofs for precise calculation
   * but can fall back to "Declared" for monthly projections.
   */
  calculateTaxableIncome(
    monthlyGross: number,
    declaration?: {
      regime: TaxRegime;
      investments80C: number;
      investments80D: number;
      hraAmount: number;
      proofs?: {
        category: string;
        status: DeclarationStatus;
        amount: number;
      }[];
    },
    useOnlyVerified = false,
  ) {
    if (!declaration) return monthlyGross * 12;

    const annualGross = monthlyGross * 12;

    if (declaration.regime === TaxRegime.OLD) {
      let investments80C = Number(declaration.investments80C || 0);
      let investments80D = Number(declaration.investments80D || 0);
      let hraAmount = Number(declaration.hraAmount || 0);

      // If strictly verifying, we iterate through proofs
      if (useOnlyVerified && declaration.proofs) {
        investments80C = declaration.proofs
          .filter(
            (p) =>
              p.category === '80C' && p.status === DeclarationStatus.VERIFIED,
          )
          .reduce((sum, p) => sum + p.amount, 0);

        investments80D = declaration.proofs
          .filter(
            (p) =>
              p.category === '80D' && p.status === DeclarationStatus.VERIFIED,
          )
          .reduce((sum, p) => sum + p.amount, 0);

        hraAmount = declaration.proofs
          .filter(
            (p) =>
              p.category === 'HRA' && p.status === DeclarationStatus.VERIFIED,
          )
          .reduce((sum, p) => sum + p.amount, 0);
      }

      const deductions =
        Math.min(investments80C, 150000) +
        Math.min(investments80D, 25000) +
        hraAmount;

      return Math.max(0, annualGross - deductions);
    }

    return annualGross;
  }
}
