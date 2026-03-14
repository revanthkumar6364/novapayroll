import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { CorporateCardService } from './corporate-card.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('corporate-cards')
@UseGuards(JwtAuthGuard)
export class CorporateCardController {
  constructor(private readonly cardService: CorporateCardService) {}

  @Get()
  async getCards(@Req() req: AuthenticatedRequest) {
    const orgId = req.user.orgs[0].orgId;
    return this.cardService.getCards(orgId);
  }

  @Post('issue')
  async issueCard(
    @Req() req: AuthenticatedRequest,
    @Body() body: { employeeId: string; cardHolderName: string },
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.cardService.issueCard(
      orgId,
      body.employeeId,
      body.cardHolderName,
    );
  }

  @Get('my-card')
  async getMyCard(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    // Note: This needs logic to find employeeId from userId
    // For now, assume it's fetched correctly
    return this.cardService.getEmployeeCard(userId);
  }

  @Post(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.cardService.deactivateCard(id);
  }
}
