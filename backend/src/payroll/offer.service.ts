import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async createTemplate(orgId: string, name: string, content: string) {
    return this.prisma.offerLetterTemplate.create({
      data: { orgId, name, content },
    });
  }

  async getTemplates(orgId: string) {
    return this.prisma.offerLetterTemplate.findMany({
      where: { orgId },
    });
  }

  /**
   * Generates an offer letter by interpolating variables.
   */
  async generateOffer(employeeId: string, templateId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        salaryStructures: { orderBy: { effectiveFrom: 'desc' }, take: 1 },
      },
    });

    const template = await this.prisma.offerLetterTemplate.findUnique({
      where: { id: templateId },
    });

    if (!employee || !template)
      throw new NotFoundException('Employee or Template not found');

    const salary = employee.salaryStructures[0];
    const placeholders = {
      '{{firstName}}': employee.firstName,
      '{{lastName}}': employee.lastName,
      '{{grossSalary}}': (salary?.grossSalary || 0) / 100,
      '{{joinDate}}': employee.joinDate.toDateString(),
    };

    let generatedContent = template.content;
    for (const [key, value] of Object.entries(placeholders)) {
      generatedContent = generatedContent.replace(
        new RegExp(key, 'g'),
        value.toString(),
      );
    }

    return {
      content: generatedContent,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      date: new Date(),
    };
  }
}
