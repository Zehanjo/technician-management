import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { TechnicianDataPay } from './technician-data-pay.entity';
import { Country } from './countries.entity';
import { PhoneCode } from './phone-code.entity';
import { UserStatus } from './users-status.entity';
import { DocumentType } from './document-type.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Country, (country) => country.technicians)
  country: Country;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  document: string;

  @ManyToOne(() => PhoneCode, (phoneCode) => phoneCode.technicians)
  phoneCode: PhoneCode;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ default: false })
  validateKedo: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true, default: '' })
  authConfirmationToken: string;

  @Column({
    nullable: true,
    default: 0.0,
    type: 'double precision',
    precision: 5,
    scale: 1,
  })
  stars: number;

  @Column({ nullable: true })
  osType: string;

  @Column({ nullable: false, unique: true })
  authHash: string;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.technicians)
  status: UserStatus;

  @ManyToOne(() => DocumentType, (documentType) => documentType.technicians)
  documentType: DocumentType;

  @OneToOne(
    () => TechnicianDataPay,
    (technicianDataPay) => technicianDataPay.technician,
  )
  dataPay: TechnicianDataPay;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
