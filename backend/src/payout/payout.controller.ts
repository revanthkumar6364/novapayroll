import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('payout')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN_FINANCE)
export class PayoutController {
  constructor(private payoutService: PayoutService) { }

  @Post(':payrollRunId')
  async initiate(@Request() req, @Param('payrollRunId') payrollRunId: string) {
    return this.payoutService.initiatePayoutBatch(req.user.orgs[0].id, payrollRunId);
  }

  @Get('history')
  async getHistory(@Request() req) {
    return this.payoutService.getHistory(req.user.orgs[0].id);
  }

  @Get('batch/:id')
  async getBatch(@Param('id') id: string) {
    return this.payoutService.getBatchDetails(id);
  }
}

