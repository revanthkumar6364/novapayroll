import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PayoutService } from './payout.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('payout')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN_FINANCE)
export class PayoutController {
  constructor(private payoutService: PayoutService) {}

  @Post(':payrollRunId')
  async initiate(
    @Request() req: AuthenticatedRequest,
    @Param('payrollRunId') payrollRunId: string,
  ) {
    return this.payoutService.initiatePayoutBatch(
      req.user.orgs[0].orgId,
      payrollRunId,
    );
  }

  @Get('history')
  async getHistory(@Request() req: AuthenticatedRequest) {
    return this.payoutService.getHistory(req.user.orgs[0].orgId);
  }

  @Get('batch/:id')
  async getBatch(@Param('id') id: string) {
    return this.payoutService.getBatchDetails(id);
  }
}
