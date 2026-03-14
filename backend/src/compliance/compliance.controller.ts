import {
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { ChallanService } from './challan.service';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('compliance')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
  constructor(
    private readonly complianceService: ComplianceService,
    private readonly challanService: ChallanService,
  ) {}

  @Get('pf-ecr')
  async downloadPfEcr(
    @Req() req: AuthenticatedRequest,
    @Query('month') month: string,
    @Query('year') year: string,
    @Res() res: Response,
  ) {
    const orgId = req.user.orgs[0].orgId;
    const { filename, content } = await this.challanService.generatePfEcr(
      orgId,
      parseInt(month),
      parseInt(year),
    );
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return res.send(content);
  }

  @Get('esi-ecr')
  async downloadEsiEcr(
    @Req() req: AuthenticatedRequest,
    @Query('month') month: string,
    @Query('year') year: string,
    @Res() res: Response,
  ) {
    const orgId = req.user.orgs[0].orgId;
    const { filename, content } = await this.challanService.generateEsicChallan(
      orgId,
      parseInt(month),
      parseInt(year),
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return res.send(content);
  }

  @Get('audit/:runId')
  async getAudit(@Param('runId') runId: string) {
    return this.complianceService.auditPayroll(runId);
  }
}
