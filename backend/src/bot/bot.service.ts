import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(private prisma: PrismaService) {}

  async processIncomingMessage(provider: 'whatsapp' | 'slack', payload: any) {
    this.logger.log(
      `Processing ${provider} message: ${JSON.stringify(payload)}`,
    );

    // 1. Identify User/Employee (Mocked for demo)
    // In production, we would map the WhatsApp number or Slack ID to an Employee ID
    const employee = await this.prisma.employee.findFirst({
      where: { status: 'ACTIVE' },
    });

    if (!employee) {
      return {
        message: 'Internal Error: No active employee found for mapping.',
      };
    }

    // 2. Simulate AI Vision Parsing (Gemini Vision)
    // In a real implementation, we would send the attachment URL to a Vision API
    const isImage = payload.type === 'image' || payload.attachments?.length > 0;

    if (isImage) {
      this.logger.log('Receipt image detected. Initiating AI Extraction...');

      // Simulating 3s AI latency
      const extractedData = await this.simulateAIExtraction();

      // 3. Create Reimbursement Request
      const request = await this.prisma.reimbursementRequest.create({
        data: {
          orgId: employee.orgId,
          employeeId: employee.id,
          amount: extractedData.amount,
          description: `Bot Auto-Extraction: ${extractedData.merchant} - ${extractedData.category}`,
          attachments: [
            payload.mediaUrl || 'https://mock-s3.bucket/receipt.jpg',
          ],
          status: 'PENDING',
        },
      });

      return {
        message: `✅ *Receipt Captured!*\n\n*Amount:* ₹${extractedData.amount}\n*Merchant:* ${extractedData.merchant}\n*Category:* ${extractedData.category}\n\nI've added this to your pending claims. 🚀`,
      };
    }

    return {
      message:
        "👋 Hello! Send me a photo of your receipt (Meal, Travel, etc.) and I'll file the claim for you instantly!",
    };
  }

  async processWebMessage(text: string) {
    const lowerText = text.toLowerCase();
    this.logger.log(`Processing web message: ${text}`);

    // Natural Language Logic (Can be replaced with actual OpenAI/Gemini API call)
    if (lowerText.includes('hii') || lowerText.includes('hello')) {
      return {
        message:
          'Hello! I am Nova, your real-time payroll assistant. How can I help you navigate the system today?',
      };
    }

    if (
      lowerText.includes('pay') ||
      lowerText.includes('vendor') ||
      lowerText.includes('invoice')
    ) {
      return {
        message:
          'To handle vendor payments, navigate to the **Vendor Payments** module. You can drag and drop invoices there, and I will extract the details for you using AI. You can also edit vendor records or archive old invoices.',
      };
    }

    if (lowerText.includes('payroll') || lowerText.includes('salary')) {
      return {
        message:
          "The **Payroll Run** section allows you to process monthly salaries. We handle TDS calculations and compliance filings automatically. Is there a specific payroll issue you're facing?",
      };
    }

    if (
      lowerText.includes('issue') ||
      lowerText.includes('help') ||
      lowerText.includes('problem')
    ) {
      return {
        message:
          "I'm here to help! If you're experiencing a technical glitch, please check the **Support** page. If it's a data discrepancy, I suggest reviewing the relevant ledger or audit logs.",
      };
    }

    return {
      message:
        "I understand you're asking about " +
        text +
        '. I can help you with vendor payouts, payroll processing, and compliance reporting. Which area should we look into first?',
    };
  }

  private async simulateAIExtraction() {
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const categories = ['Meals', 'Travel', 'Internet', 'Office Supplies'];
    const merchants = ['Uber', 'Starbucks', 'Amazon', 'Airtel'];

    return {
      amount: Math.floor(Math.random() * 2000) + 100,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      date: new Date().toISOString(),
    };
  }
}
