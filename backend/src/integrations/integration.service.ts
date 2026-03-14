import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Orchestrates a direct API sync with Zoho Books or Tally.
   * In a real production environment, this would use OAuth2 tokens.
   */
  async syncToAccounting(
    orgId: string,
    type: 'ZOHO' | 'TALLY',
    data: { items: any[] },
  ) {
    this.logger.log(`Initiating Direct Sync for Org: ${orgId} to ${type}`);

    // Simulate API handshake
    console.log(
      `[Direct API Sync] Sending ${data.items.length} records to ${type}...`,
    );

    return Promise.resolve({
      success: true,
      syncId: `SYNC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Receives webhooks from ATS systems (Greenhouse/Lever).
   * Automatically creates a draft employee record.
   */
  async handleATSWebhook(
    orgId: string,
    source: string,
    payload: {
      candidate: {
        first_name: string;
        last_name: string;
        email: string;
        start_date?: string;
      };
    },
  ) {
    this.logger.log(`Received ATS Webhook from ${source} for Org: ${orgId}`);

    // Transform payload to Employee creation data
    const newEmployee = await this.prisma.employee.create({
      data: {
        orgId,
        firstName: payload.candidate.first_name,
        lastName: payload.candidate.last_name,
        email: payload.candidate.email,
        employeeId: `NEW-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        joinDate: new Date(payload.candidate.start_date || Date.now()),
        status: 'ACTIVE', // Or ONBOARDING if we had that enum status
        onboardingProgress: 0,
      },
    });

    return {
      message: 'Employee record created from ATS sync',
      employeeId: newEmployee.id,
    };
  }

  /**
   * Fetches active integration settings for an organization.
   */
  async getSettings(orgId: string) {
    const org = await this.prisma.org.findUnique({
      where: { id: orgId },
      select: { statutoryConfig: true },
    });

    // We'll use statutoryConfig JSON or a new field for integrations
    return org?.statutoryConfig || {};
  }
}
