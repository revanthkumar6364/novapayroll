import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('me/payroll')
@UseGuards(JwtAuthGuard)
export class MePayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Get('payslips')
  async getMyPayslips(@Req() req: { user: { id: string } }) {
    // The userId is attached to the request by the JwtStrategy
    return this.payrollService.getMyPayslips(req.user.id);
  }
}
