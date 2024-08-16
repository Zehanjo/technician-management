import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateTechnicianDataBankDto } from './technician-data-bank-create.dto';

export class CreateTechnicianDataPayDto {
  @IsOptional()
  @IsUUID()
  dataBankId?: string;

  @IsNotEmpty()
  @IsString()
  someField: string;

  @IsOptional()
  dataBank?: CreateTechnicianDataBankDto;
}
