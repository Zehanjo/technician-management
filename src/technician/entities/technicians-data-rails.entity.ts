import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { TechnicianDataPay } from './technician-data-pay.entity';

@Entity('technicians_data_rails')
export class TechnicianDataRails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  railNumber: string;

  @OneToOne(
    () => TechnicianDataPay,
    (technicianDataPay) => technicianDataPay.dataRails,
  )
  dataPay: TechnicianDataPay;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
