import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('integrations')
export class IntegrationController {
  constructor(private integrationService: IntegrationService) {}

  @Get('settings')
  @UseGuards(JwtAuthGuard)
  async getSettings(@Query('orgId') orgId: string) {
    return this.integrationService.getSettings(orgId);
  }

  @Post('sync/:type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN_FINANCE)
  async triggerSync(
    @Query('orgId') orgId: string,
    @Param('type') type: 'ZOHO' | 'TALLY',
    @Body() data: any,
  ) {
    return this.integrationService.syncToAccounting(orgId, type, data);
  }

  /**
   * Public webhook receiver for ATS (Greenhouse/Lever).
   * In production, this would use secret-key signature validation.
   */
  @Post('webhook/ats/:orgId')
  async atsWebhook(
    @Param('orgId') orgId: string,
    @Query('source') source: string,
    @Body() payload: any,
  ) {
    return this.integrationService.handleATSWebhook(orgId, source, payload);
  }
}
