import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async getWallet(@Req() req: AuthenticatedRequest) {
    const orgId = req.user.orgs[0].orgId; // Assuming multi-tenant structure
    return this.walletService.getWallet(orgId);
  }

  @Post('deposit')
  async deposit(
    @Req() req: AuthenticatedRequest,
    @Body() body: { amount: number; description: string },
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.walletService.deposit(orgId, body.amount, body.description);
  }

  @Get('transactions')
  async getTransactions(@Req() req: AuthenticatedRequest) {
    const orgId = req.user.orgs[0].orgId;
    return this.walletService.getTransactions(orgId);
  }

  @Post('bulk-payout')
  async bulkPayout(
    @Req() req: AuthenticatedRequest,
    @Body()
    body: {
      type: string;
      payouts: { id: string; amount: number }[];
      mode: string;
    },
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.walletService.processBulkPayoutSimulation(
      orgId,
      body.payouts,
      body.type,
      body.mode,
    );
  }
}
