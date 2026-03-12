import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';
import { DashboardService } from './dashboard.service';

@Module({
  providers: [OrgService, DashboardService],
  controllers: [OrgController],
  exports: [OrgService, DashboardService],
})
export class OrgModule {}
