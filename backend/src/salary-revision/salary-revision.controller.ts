import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SalaryRevisionService } from './salary-revision.service';
import {
  CreateSalaryRevisionDto,
  UpdateSalaryRevisionStatusDto,
} from './dto/salary-revision.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('salary-revision')
@UseGuards(JwtAuthGuard)
export class SalaryRevisionController {
  constructor(private readonly salaryRevisionService: SalaryRevisionService) {}

  @Post()
  create(@Body() createSalaryRevisionDto: CreateSalaryRevisionDto) {
    return this.salaryRevisionService.create(createSalaryRevisionDto);
  }

  @Get('employee/:employeeId')
  findAllByEmployee(@Param('employeeId') employeeId: string) {
    return this.salaryRevisionService.findAllByEmployee(employeeId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateSalaryRevisionStatusDto,
  ) {
    return this.salaryRevisionService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryRevisionService.delete(id);
  }
}
