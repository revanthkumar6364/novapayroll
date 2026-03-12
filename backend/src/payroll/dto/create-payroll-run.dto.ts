import { IsInt, Min, Max, IsEnum, IsOptional } from 'class-validator';
import { PayrollRunType } from '@prisma/client';

export class CreatePayrollRunDto {
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsEnum(PayrollRunType)
  @IsOptional()
  type?: PayrollRunType;
}
