import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ReimbursementService } from './reimbursement.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Status } from '@prisma/client';

interface ReimbursementRequestDto {
  employeeId: string;
  amount: number;
  description: string;
  type?: string;
}

@Controller('reimbursement')
@UseGuards(JwtAuthGuard)
export class ReimbursementController {
  constructor(private readonly reimbursementService: ReimbursementService) {}

  @Get()
  async listRequests(
    @Req() req: AuthenticatedRequest,
    @Query('employeeId') employeeId?: string,
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.reimbursementService.listRequests(orgId, employeeId);
  }

  @Post()
  async createRequest(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ReimbursementRequestDto,
  ) {
    // If employee is creating, use their employee ID from token if available
    // For now, assuming employeeId is passed or we find it from user.id
    const orgId = req.user.orgs[0].orgId;
    return this.reimbursementService.createRequest(orgId, dto.employeeId, dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body('status') status: Status,
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.reimbursementService.updateStatus(orgId, id, status);
  }
}
