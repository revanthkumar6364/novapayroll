import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallanService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generates PF ECR (Electronic Challan-cum-Return) text file format.
   * Format: UAN#MemberName#Gross#EPF#EPS#EDLI#EE_Share#ER_Share...
   */
  async generatePfEcr(orgId: string, month: number, year: number) {
    const employees = await this.prisma.employee.findMany({
      where: { orgId, status: 'ACTIVE' },
      include: {
        payrollRunItems: {
          where: {
            payrollRun: {
              month,
              year,
              status: 'PAID',
            },
          },
        },
      },
    });

    let ecrContent = '';
    for (const emp of employees) {
      if (emp.payrollRunItems.length === 0) continue;

      const item = emp.payrollRunItems[0];
      const earnings = item.earnings as Record<string, number>;
      const gross = Object.values(earnings).reduce((a, b) => a + b, 0);

      const uan = emp.uan || 'NOT_AVAIL';
      const name = `${emp.firstName} ${emp.lastName}`;
      const epfWage = Math.min(gross, 15000); // PF Ceiling
      const eeShare = Math.round(epfWage * 0.12);
      const erShare = Math.round(epfWage * 0.0367);
      const epsShare = Math.round(epfWage * 0.0833);

      ecrContent += `${uan}#~#${name}#~#${gross}#~#${epfWage}#~#${epfWage}#~#${epfWage}#~#${eeShare}#~#${epsShare}#~#${erShare}#~#0#~#0\r\n`;
    }

    return {
      filename: `PF_ECR_${year}_${month}.txt`,
      content: ecrContent,
    };
  }

  /**
   * Generates ESIC Challan data (CSV format)
   */
  async generateEsicChallan(orgId: string, month: number, year: number) {
    const employees = await this.prisma.employee.findMany({
      where: { orgId, status: 'ACTIVE' },
      include: {
        payrollRunItems: {
          where: {
            payrollRun: {
              month,
              year,
              status: 'PAID',
            },
          },
        },
      },
    });

    let csvContent = 'IP Number,IP Name,No of Days,Total Wages,Reason Code\n';
    for (const emp of employees) {
      if (emp.payrollRunItems.length === 0) continue;

      const item = emp.payrollRunItems[0];
      const earnings = item.earnings as Record<string, number>;
      const gross = Object.values(earnings).reduce((a, b) => a + b, 0);

      const esicNo = emp.esiNumber || '0000000000';
      const name = `${emp.firstName} ${emp.lastName}`;

      if (gross > 21000) continue; // ESIC limit

      csvContent += `${esicNo},${name},30,${gross},0\n`;
    }

    return {
      filename: `ESIC_Challan_${year}_${month}.csv`,
      content: csvContent,
    };
  }
}
