import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getRequests(@Req() req: AuthenticatedRequest) {
    const orgId = req.user.orgs[0].orgId;
    return this.expenseService.getRequests(orgId);
  }

  @Post('request')
  async createRequest(
    @Req() req: AuthenticatedRequest,
    @Body() body: { amount: number; description: string },
  ) {
    const orgId = req.user.orgs[0].orgId;
    const employeeId = req.user.id; // Correct lookup needed in real scenario
    return this.expenseService.createRequest(orgId, employeeId, body);
  }

  @Post(':id/approve')
  async approve(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const orgId = req.user.orgs[0].orgId;
    return this.expenseService.approveRequest(req.user.id, orgId, id);
  }

  @Get('my-requests')
  async getMyRequests(@Req() req: AuthenticatedRequest) {
    // Correct lookup needed in real scenario
    return this.expenseService.getMyRequests(req.user.id);
  }
}
