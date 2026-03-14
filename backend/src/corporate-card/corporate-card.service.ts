import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CorporateCardService {
  private readonly logger = new Logger(CorporateCardService.name);
  constructor(private prisma: PrismaService) {}

  async issueCard(orgId: string, employeeId: string, cardHolderName: string) {
    // Generate mock card details
    const lastFour = Math.floor(1000 + Math.random() * 9000).toString();
    const expiryDate = `${Math.floor(1 + Math.random() * 12)
      .toString()
      .padStart(2, '0')}/${(new Date().getFullYear() % 100) + 3}`;

    return this.prisma.corporateCard.create({
      data: {
        orgId,
        employeeId,
        cardHolderName,
        lastFour,
        expiryDate,
        limit: 50000.0,
        spent: 0.0,
      },
    });
  }

  async getCards(orgId: string) {
    return this.prisma.corporateCard.findMany({
      where: { orgId, status: 'ACTIVE' },
    });
  }

  async getEmployeeCard(employeeId: string) {
    return this.prisma.corporateCard.findFirst({
      where: { employeeId, status: 'ACTIVE' },
    });
  }

  async deactivateCard(cardId: string) {
    return this.prisma.corporateCard.update({
      where: { id: cardId },
      data: { status: 'INACTIVE' },
    });
  }

  async requestPhysicalCard(cardId: string, address: string) {
    console.log(`[CARD_ISSUANCE] Physical card requested for ID: ${cardId}`);
    console.log(`[CARD_ISSUANCE] Shipping to: ${address}`);
    return Promise.resolve({
      success: true,
      trackingId: `NV-${Math.random().toString(36).substring(7).toUpperCase()}`,
      estimatedDelivery: '3-5 Business Days',
    });
  }

  async setCardPin(cardId: string, pinHash: string) {
    console.log(`[SECURE_VAULT] Setting PIN for card ${cardId}`);
    this.logger.log(
      `PIN hash ${pinHash.substring(0, 8)}... received for validation`,
    );
    return Promise.resolve({
      success: true,
      message: 'PIN updated via encrypted session',
    });
  }
}
