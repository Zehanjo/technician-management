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

  // Relacion con la tabla tipo de cuenta
  @ManyToOne(
    () => BankAccountType,
    (bankAccountType) => bankAccountType.technicianDataBank,
  )
  accountType: BankAccountType;

  // numero de cuenta
  @Column({ unique: true })
  accountNumber: string;

  // CCI
  @Column({ unique: true })
  CCI: string;

  //  Relacion con TechnicianDataPay
  @OneToOne(
    () => TechnicianDataPay,
    (technicianDataPay) => technicianDataPay.dataBank,
  )
  dataPay: TechnicianDataPay;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
