import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Technician } from './techinician.entity';

@Entity('user_statuses')
export class UserStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  statusName: string;

  @OneToMany(() => Technician, (technician) => technician.status)
  technicians: Technician[];
}
