import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('compliance')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
    constructor(private readonly complianceService: ComplianceService) { }

    @Get('pf-ecr/:runId')
    async downloadPfEcr(@Param('runId') runId: string, @Res() res: Response) {
        const ecr = await this.complianceService.generatePfEcr(runId);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename=PF_ECR_${runId}.txt`);
        return res.send(ecr);
    }

    @Get('esi-ecr/:runId')
    async downloadEsiEcr(@Param('runId') runId: string, @Res() res: Response) {
        const ecr = await this.complianceService.generateEsiEcr(runId);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename=ESI_ECR_${runId}.txt`);
        return res.send(ecr);
    }

    @Get('audit/:runId')
    async getAudit(@Param('runId') runId: string) {
        return this.complianceService.auditPayroll(runId);
    }
}
