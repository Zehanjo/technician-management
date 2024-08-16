import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateTechnicianDataBankDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  CCI: string;

  @IsOptional()
  @IsUUID()
  bankId?: string;

  @IsOptional()
  @IsUUID()
  accountTypeId?: string;
}
