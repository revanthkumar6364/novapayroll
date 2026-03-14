import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsObject,
} from 'class-validator';

export class OrgSetupDto {
  @IsString()
  @IsOptional()
  legalName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  gstin?: string;

  @IsInt()
  @IsOptional()
  onboardingStep?: number;

  @IsObject()
  @IsOptional()
  statutoryConfig?: any;

  @IsObject()
  @IsOptional()
  payrollSettings?: any;
  @IsBoolean()
  @IsOptional()
  isSetupComplete?: boolean;
}
