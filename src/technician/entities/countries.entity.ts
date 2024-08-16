import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Technician } from './techinician.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Technician, (technician) => technician.country)
  technicians: Technician[];
}
