import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Technician } from './techinician.entity';

@Entity('document_types')
export class DocumentType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  typeName: string;

  // Relación con la entidad Technician
  @OneToMany(() => Technician, (technician) => technician.documentType)
  technicians: Technician[];
}
