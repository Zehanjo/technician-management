import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Technician } from './techinician.entity';

@Entity('phone_codes')
export class PhoneCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @OneToMany(() => Technician, (technician) => technician.phoneCode)
  technicians: Technician[];
}
