import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, DeclarationStatus } from '@prisma/client';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('tax')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaxController {
  constructor(private taxService: TaxService) {}

  @Get('my-declaration')
  async getMyDeclaration(
    @Req() req: AuthenticatedRequest,
    @Query('year') year: string,
  ) {
    // In a real app, we'd find the employeeId linked to the user
    // For now, we assume the user has an associated employee
    const employeeId = req.user.userId;
    return this.taxService.getEmployeeDeclaration(employeeId, parseInt(year));
  }

  @Post('declaration')
  async updateMyDeclaration(
    @Req() req: AuthenticatedRequest,
    @Body() dto: any,
  ) {
    const employeeId = req.user.userId;
    return this.taxService.createOrUpdateDeclaration(employeeId, dto);
  }

  @Post('declaration/:id/submit')
  async submitForReview(@Param('id') id: string) {
    return this.taxService.submitForVerification(id);
  }

  @Post('declaration/:id/proof')
  async addProof(@Param('id') id: string, @Body() dto: any) {
    return this.taxService.addProof(id, dto);
  }

  @Get('admin/verification-queue')
  @Roles(Role.OWNER, Role.ADMIN_FINANCE)
  async getQueue(@Query('orgId') orgId: string) {
    return this.taxService.getAdminVerificationQueue(orgId);
  }

  @Patch('admin/review/:id')
  @Roles(Role.OWNER, Role.ADMIN_FINANCE)
  async review(
    @Param('id') id: string,
    @Body() dto: { status: DeclarationStatus; adminRemarks?: string },
  ) {
    return this.taxService.reviewDeclaration(id, dto.status, dto.adminRemarks);
  }
}
