import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { MePayrollController } from './me-payroll.controller';
import { TaxService } from './tax.service';
import { OfferService } from './offer.service';
import { ReportService } from './report.service';
import { ContractorService } from './contractor.service';
import { BenefitService } from './benefit.service';

@Module({
  providers: [
    PayrollService,
    TaxService,
    OfferService,
    ReportService,
    ContractorService,
    BenefitService,
  ],
  controllers: [PayrollController, MePayrollController],
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
