import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('accounting')
@UseGuards(JwtAuthGuard)
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('export/tally')
  async exportTally(
    @Req() req: AuthenticatedRequest,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const orgId = req.user.orgs[0].orgId;
    const csv = await this.accountingService.generateTallyExport(
      orgId,
      new Date(start),
      new Date(end),
    );
    return { csv };
  }

  @Get('export/zoho')
  async exportZoho(
    @Req() req: AuthenticatedRequest,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const orgId = req.user.orgs[0].orgId;
    const csv = await this.accountingService.generateZohoExport(
      orgId,
      new Date(start),
      new Date(end),
    );
    return { csv };
  }
}
