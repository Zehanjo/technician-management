import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnicianDataBank } from './technician-data-bank.entity';
import { Technician } from './techinician.entity';
import { TechnicianDataRails } from './technicians-data-rails.entity';

@Entity({ name: 'technicians_data_pay' })
export class TechnicianDataPay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relacion con la tabla techinician_data_bank
  @OneToOne(
    () => TechnicianDataBank,
    (technicianDataBank) => technicianDataBank.dataPay,
  )
  @JoinColumn()
  dataBank: TechnicianDataBank;

  // Relacion con la tabla techniciand_data_rails
  @OneToOne(
    () => TechnicianDataRails,
    (technicianDataRails) => technicianDataRails.dataPay,
  )
  @JoinColumn()
  dataRails: TechnicianDataRails;

  @OneToOne(() => Technician, (technician) => technician.dataPay)
  technician: Technician;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
