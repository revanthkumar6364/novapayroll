import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async generateStatutoryReport(
    orgId: string,
    type: 'PF_ECR' | 'ESI_CONTRIBUTION' | 'TDS_24Q' | 'FORM_16',
    monthId: string,
  ) {
    // Mock generation logic - in a real app, this would use a library like 'exceljs' or 'pdf-lib'
    const fileRef = `reports/${type}_${orgId}_${Date.now()}.csv`;

    const report = await this.prisma.reportAudit.create({
      data: {
        orgId,
        type,
        fileRef,
        metadata: { monthId, generatedAt: new Date().toISOString() },
      },
    });

    return {
      id: report.id,
      fileUrl: `https://storage.novapayroll.com/${fileRef}`, // Mock public URL
      type: report.type,
      createdAt: report.createdAt,
    };
  }

  async getReportHistory(orgId: string) {
    return this.prisma.reportAudit.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }
}
