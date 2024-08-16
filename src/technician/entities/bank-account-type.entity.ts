import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TechnicianDataBank } from './technician-data-bank.entity';

@Entity('bank_account_types')
export class BankAccountType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(
    () => TechnicianDataBank,
    (technicianDataBank) => technicianDataBank.accountType,
  )
  technicianDataBank: TechnicianDataBank[];
}
