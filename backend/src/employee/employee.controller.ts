import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  listEmployees(@Query('orgId') orgId: string) {
    return this.employeeService.listEmployees(orgId);
  }

  @Post()
  createEmployee(
    @Query('orgId') orgId: string,
    @Body() dto: CreateEmployeeDto,
  ) {
    return this.employeeService.createEmployee(orgId, dto);
  }

  @Get(':id')
  getEmployee(@Query('orgId') orgId: string, @Param('id') id: string) {
    return this.employeeService.getEmployee(orgId, id);
  }

  @Patch(':id')
  updateEmployee(
    @Query('orgId') orgId: string,
    @Param('id') id: string,
    @Body() dto: Partial<CreateEmployeeDto>,
  ) {
    return this.employeeService.updateEmployee(orgId, id, dto);
  }
}
