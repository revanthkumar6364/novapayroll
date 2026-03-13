import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFinalSettlementDto {
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @IsDateString()
  @IsNotEmpty()
  exitDate: string;

  @IsDateString()
  @IsNotEmpty()
  lastWorkingDay: string;

  @IsNumber()
  @IsNotEmpty()
  noticePeriodDays: number;

  @IsNumber()
  @IsOptional()
  leaveEncashment?: number;

  @IsNumber()
  @IsOptional()
  gratuity?: number;

  @IsNumber()
  @IsOptional()
  bonus?: number;

  @IsNumber()
  @IsOptional()
  deductions?: number;

  @IsNumber()
  @IsNotEmpty()
  netPayable: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateSettlementStatusDto {
  @IsString()
  @IsNotEmpty()
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
}
