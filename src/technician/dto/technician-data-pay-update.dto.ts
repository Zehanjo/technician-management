import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UpdateTechnicianDataBankDto } from './technician-data-bank-update.dto';

export class UpdateTechnicianDataPayDto {
  @IsOptional()
  @IsUUID()
  dataBankId?: string;

  @IsOptional()
  @IsString()
  someField?: string;

  @IsOptional()
  dataBank?: UpdateTechnicianDataBankDto;
}
