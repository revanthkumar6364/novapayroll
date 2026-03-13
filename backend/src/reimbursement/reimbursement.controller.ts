import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ReimbursementService } from './reimbursement.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reimbursement')
@UseGuards(JwtAuthGuard)
export class ReimbursementController {
  constructor(private readonly reimbursementService: ReimbursementService) {}

  @Get()
  async listRequests(@Request() req, @Query('employeeId') employeeId?: string) {
    return this.reimbursementService.listRequests(req.user.orgId, employeeId);
  }

  @Post()
  async createRequest(@Request() req, @Body() dto: any) {
    // If employee is creating, use their employee ID from token if available
    // For now, assuming employeeId is passed or we find it from user.id
    return this.reimbursementService.createRequest(
      req.user.orgId,
      dto.employeeId,
      dto,
    );
  }

  @Patch(':id/status')
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.reimbursementService.updateStatus(req.user.orgId, id, status);
  }
}
