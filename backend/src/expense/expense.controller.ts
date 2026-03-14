import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getRequests(@Req() req: any) {
    const orgId = req.user.orgs[0].orgId;
    return this.expenseService.getRequests(orgId);
  }

  @Post('request')
  async createRequest(@Req() req: any, @Body() body: { amount: number; description: string }) {
    const orgId = req.user.orgs[0].orgId;
    const employeeId = req.user.id; // Correct lookup needed in real scenario
    return this.expenseService.createRequest(orgId, employeeId, body);
  }

  @Post(':id/approve')
  async approve(@Req() req: any, @Param('id') id: string) {
    const orgId = req.user.orgs[0].orgId;
    return this.expenseService.approveRequest(req.user.id, orgId, id);
  }

  @Get('my-requests')
  async getMyRequests(@Req() req: any) {
    // Correct lookup needed in real scenario
    return this.expenseService.getMyRequests(req.user.id);
  }
}
