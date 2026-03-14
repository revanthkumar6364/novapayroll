import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { MePayrollController } from './me-payroll.controller';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
import { OfferService } from './offer.service';
import { ReportService } from './report.service';
import { ContractorService } from './contractor.service';
import { BenefitService } from './benefit.service';
import { NotificationsModule } from '../notifications/notifications.module';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [NotificationsModule, PrismaModule],
  providers: [
    PayrollService,
    TaxService,
    OfferService,
    ReportService,
    ContractorService,
    BenefitService,
  ],
  controllers: [PayrollController, MePayrollController, TaxController],
  exports: [
    PayrollService,
    TaxService,
    OfferService,
    ReportService,
    ContractorService,
    BenefitService,
  ],
})
export class PayrollModule {}
