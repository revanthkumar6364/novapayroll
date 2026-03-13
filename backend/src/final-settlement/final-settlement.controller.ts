import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FinalSettlementService } from './final-settlement.service';
import {
  CreateFinalSettlementDto,
  UpdateSettlementStatusDto,
} from './dto/final-settlement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('final-settlement')
@UseGuards(JwtAuthGuard)
export class FinalSettlementController {
  constructor(
    private readonly finalSettlementService: FinalSettlementService,
  ) {}

  @Post()
  create(@Body() createDto: CreateFinalSettlementDto) {
    return this.finalSettlementService.create(createDto);
  }

  @Get()
  findAll() {
    return this.finalSettlementService.findAll();
  }

  @Get('employee/:employeeId')
  findOneByEmployee(@Param('employeeId') employeeId: string) {
    return this.finalSettlementService.findOneByEmployee(employeeId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateSettlementStatusDto,
  ) {
    return this.finalSettlementService.updateStatus(id, updateStatusDto);
  }
}
