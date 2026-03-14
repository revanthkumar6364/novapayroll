import { Module } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { ComplianceController } from './compliance.controller';
import { ChallanService } from './challan.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ComplianceService, ChallanService],
  controllers: [ComplianceController],
  exports: [ComplianceService, ChallanService],
})
export class ComplianceModule {}
