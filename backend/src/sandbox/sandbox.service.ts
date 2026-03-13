import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SandboxService {
  constructor(private prisma: PrismaService) {}

  async verifyGst(orgId: string, gstin: string) {
    const org = await this.prisma.org.findUnique({
      where: { id: orgId },
    });

    if (!org) throw new NotFoundException('Organization not found');

    // Simulate real-world API latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update Org with GSTIN and set KYC verified (Simulation)
    const updatedOrg = await this.prisma.org.update({
      where: { id: orgId },
      data: {
        gstin,
        isKycVerified: true,
      },
    });

    return {
      success: true,
      message: 'GSTIN Verified successfully via Sandbox',
      gstDetails: {
        gstin: updatedOrg.gstin,
        legalName: org.name + ' PVT LTD',
        status: 'ACTIVE',
        registrationDate: new Date('2020-01-01'),
        address: '123 Tech Park, Bangalore, KA',
      },
    };
  }

  async verifyPan(employeeId: string, pan: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) throw new NotFoundException('Employee not found');

    // Simulate real-world API latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update Contractor PAN if applicable, or simulate document status update
    // For now, we simulate a document verification check
    return {
      success: true,
      message: `PAN ${pan} verified for ${employee.firstName}`,
      panDetails: {
        pan,
        nameOnPan: `${employee.firstName} ${employee.lastName}`.toUpperCase(),
        status: 'VALID',
        category: 'INDIVIDUAL',
      },
    };
  }

  async verifyUpi(vpa: string) {
    // Simulate real-world API latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isValid = vpa.includes('@');

    return {
      success: isValid,
      message: isValid ? 'VPA is valid and active' : 'Invalid VPA format',
      vpaDetails: isValid
        ? {
            vpa,
            name: 'Sandbox User',
            bank: vpa.split('@')[1].toUpperCase(),
          }
        : null,
    };
  }
}
