import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrgSetupDto } from './dto/org-setup.dto';

interface StatutoryConfig {
  pfEnabled: boolean;
  esiEnabled: boolean;
  ptEnabled: boolean;
  tdsEnabled: boolean;
}

interface PayrollSettings {
  cycle: string;
  payDate: number;
}

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async getOrg(orgId: string) {
    const org = await this.prisma.org.findUnique({
      where: { id: orgId },
    });
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async updateSetup(orgId: string, dto: OrgSetupDto) {
    const settings = dto.payrollSettings as unknown as Record<string, any>;
    const statutory = dto.statutoryConfig as unknown as Record<string, any>;

    return this.prisma.org.update({
      where: { id: orgId },
      data: {
        isSetupComplete: dto.isSetupComplete,
        payrollSettings: settings || undefined,
        statutoryConfig: statutory || undefined,
      },
    });
  }

  async checkAndCompleteSetup(orgId: string) {
    const org = await this.prisma.org.findUnique({ where: { id: orgId } });
    if (!org) return;

    const payrollSettings = org.payrollSettings as unknown as PayrollSettings;
    const statutoryConfig = org.statutoryConfig as unknown as StatutoryConfig;

    if (payrollSettings && statutoryConfig) {
      await this.prisma.org.update({
        where: { id: orgId },
        data: { isSetupComplete: true },
      });
    }
  }

  async saveWizardStep(orgId: string, step: number, data: Record<string, any>) {
    const org = await this.getOrg(orgId);

    const updateData: Record<string, any> = { onboardingStep: step };

    if (step === 2) updateData.payrollSettings = data;
    if (step === 3) updateData.statutoryConfig = data;
    if (step === 4)
      updateData.payrollSettings = {
        ...(org.payrollSettings as unknown as Record<string, any>),
        ...data,
      };

    return this.prisma.org.update({
      where: { id: orgId },
      data: updateData,
    });
  }

  async listMembers(orgId: string) {
    return this.prisma.orgMembership.findMany({
      where: { orgId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }
}
