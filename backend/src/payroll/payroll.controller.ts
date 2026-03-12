import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('payroll')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN_FINANCE)
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Get('runs')
  listRuns(@Query('orgId') orgId: string) {
    return this.payrollService.listRuns(orgId);
  }

  @Post('runs')
  createRun(@Query('orgId') orgId: string, @Body() dto: CreatePayrollRunDto) {
    return this.payrollService.createRun(orgId, dto);
  }

  @Post('runs/:id/calculate')
  calculate(@Param('id') id: string) {
    return this.payrollService.calculateRun(id);
  }

  @Post('runs/:id/lock')
  lock(@Param('id') id: string) {
    return this.payrollService.lockRun(id);
  }
}
