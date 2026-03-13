import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSalaryRevisionDto {
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @IsNumber()
  @IsOptional()
  oldCtc?: number;

  @IsNumber()
  @IsNotEmpty()
  newCtc: number;

  @IsDateString()
  @IsNotEmpty()
  effectiveDate: string;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class UpdateSalaryRevisionStatusDto {
  @IsString()
  @IsNotEmpty()
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'TERMINATED';
}
