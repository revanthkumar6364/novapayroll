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
    const settings = dto.payrollSettings;
    const statutory = dto.statutoryConfig;

    const data: any = {
      isSetupComplete: dto.isSetupComplete,
      payrollSettings: settings || undefined,
      statutoryConfig: statutory || undefined,
    } as any;

    return this.prisma.org.update({
      where: { id: orgId },
      data,
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
        data: { isSetupComplete: true } as any,
      });
    }
  }

  async saveWizardStep(orgId: string, step: number, data: any) {
    const org = await this.getOrg(orgId);

    const updateData: any = { onboardingStep: step };

    if (step === 2) updateData.payrollSettings = data;
    if (step === 3) updateData.statutoryConfig = data;
    if (step === 4)
      updateData.payrollSettings = { ...(org.payrollSettings as any), ...data }; // Multi-part setups

    return this.prisma.org.update({
      where: { id: orgId },
      data: updateData,
    });
  }
}
