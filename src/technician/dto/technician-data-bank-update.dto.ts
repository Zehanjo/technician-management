import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTechnicianDataBankDto {
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  CCI?: string;

  @IsOptional()
  @IsUUID()
  bankId?: string;

  @IsOptional()
  @IsUUID()
  accountTypeId?: string;
}
