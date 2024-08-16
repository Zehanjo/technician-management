// import { Bank } from 'src/general/entities/banks.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnicianDataPay } from './technician-data-pay.entity';
import { BankAccountType } from './bank-account-type.entity';

@Entity({ name: 'technicians_data_bank' })
export class TechnicianDataBank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => BankAccountType,
    (bankAccountType) => bankAccountType.technicianDataBank,
  )
  accountType: BankAccountType;

  @Column({ unique: true })
  accountNumber: string;

  @Column({ unique: true })
  CCI: string;

  @OneToOne(
    () => TechnicianDataPay,
    (technicianDataPay) => technicianDataPay.dataBank,
  )
  dataPay: TechnicianDataPay;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
