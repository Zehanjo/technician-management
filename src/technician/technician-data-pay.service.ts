import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { TechnicianDataPay } from './entities/technician-data-pay.entity';
import { CreateTechnicianDataPayDto } from './technician-data-pay-create.dto';
import { UpdateTechnicianDataPayDto } from './technician-data-pay-update.dto';
import { TechnicianDataBank } from './entities/technician-data-bank.entity';

@Injectable()
export class TechnicianDataPayService {
  constructor(
    @InjectRepository(TechnicianDataPay)
    private readonly technicianDataPayRepository: Repository<TechnicianDataPay>,
    // @InjectRepository(TechnicianDataPay)
    // private readonly technicianDataPayRepository: Repository<TechnicianDataPay>,
    @InjectRepository(TechnicianDataBank)
    private readonly technicianDataBankRepository: Repository<TechnicianDataBank>,
  ) {}

  async create(
    createTechnicianDataPayDto: CreateTechnicianDataPayDto,
  ): Promise<TechnicianDataPay> {
    const { dataBank, dataBankId, ...technicianDataPayData } =
      createTechnicianDataPayDto;

    let technicianDataBank: TechnicianDataBank | undefined;

    if (dataBank) {
      if (dataBankId) {
        // Si se proporciona un ID para TechnicianDataBank, enlaza con el registro existente
        technicianDataBank = await this.technicianDataBankRepository.findOne({
          where: { id: dataBankId },
        });

        if (technicianDataBank) {
          // Verificar unicidad de accountNumber y CCI si se desea actualizar
          const existingAccountNumber =
            await this.technicianDataBankRepository.findOne({
              where: {
                accountNumber: dataBank.accountNumber,
                id: Not(dataBankId),
              },
            });

          if (existingAccountNumber) {
            throw new ConflictException('Account Number already exists');
          }

          const existingCCI = await this.technicianDataBankRepository.findOne({
            where: { CCI: dataBank.CCI, id: Not(dataBankId) },
          });

          if (existingCCI) {
            throw new ConflictException('CCI already exists');
          }

          // Actualiza el registro existente solo si es necesario
          await this.technicianDataBankRepository.update(
            technicianDataBank.id,
            dataBank,
          );
        } else {
          throw new NotFoundException('TechnicianDataBank not found');
        }
      } else {
        // Crear un nuevo registro
        technicianDataBank = this.technicianDataBankRepository.create(dataBank);

        // Verificar unicidad de accountNumber y CCI
        const existingAccountNumber =
          await this.technicianDataBankRepository.findOne({
            where: { accountNumber: technicianDataBank.accountNumber },
          });

        if (existingAccountNumber) {
          throw new ConflictException('Account Number already exists');
        }

        const existingCCI = await this.technicianDataBankRepository.findOne({
          where: { CCI: technicianDataBank.CCI },
        });

        if (existingCCI) {
          throw new ConflictException('CCI already exists');
        }

        await this.technicianDataBankRepository.save(technicianDataBank);
      }
    } else if (dataBankId) {
      // Solo enlaza el TechnicianDataBank existente si no se proporciona dataBank
      technicianDataBank = await this.technicianDataBankRepository.findOne({
        where: { id: dataBankId },
      });

      if (!technicianDataBank) {
        throw new NotFoundException('TechnicianDataBank not found');
      }
    }

    // Crear TechnicianDataPay y enlazar con TechnicianDataBank
    const technicianDataPay = this.technicianDataPayRepository.create({
      ...technicianDataPayData,
      dataBank: technicianDataBank,
    });

    return await this.technicianDataPayRepository.save(technicianDataPay);
  }

  async findAll(): Promise<TechnicianDataPay[]> {
    return this.technicianDataPayRepository.find({
      relations: ['dataBank', 'dataRails'],
    });
  }

  async update(
    id: string,
    updateTechnicianDataPayDto: UpdateTechnicianDataPayDto,
  ): Promise<TechnicianDataPay> {
    const { dataBank, dataBankId, ...technicianDataPayData } =
      updateTechnicianDataPayDto;

    // Verificar si el TechnicianDataPay existe
    const technicianDataPay = await this.technicianDataPayRepository.findOne({
      where: { id },
      relations: ['dataBank'],
    });

    if (!technicianDataPay) {
      throw new NotFoundException('TechnicianDataPay not found');
    }

    let technicianDataBank: TechnicianDataBank | undefined;

    if (dataBank) {
      if (dataBankId) {
        // Actualizar o crear TechnicianDataBank
        technicianDataBank = await this.technicianDataBankRepository.findOne({
          where: { id: dataBankId },
        });

        if (technicianDataBank) {
          // Verificar unicidad de accountNumber y CCI
          const existingAccountNumber =
            await this.technicianDataBankRepository.findOne({
              where: {
                accountNumber: dataBank.accountNumber,
                id: Not(dataBankId),
              },
            });

          if (existingAccountNumber) {
            throw new ConflictException('Account Number already exists');
          }

          const existingCCI = await this.technicianDataBankRepository.findOne({
            where: { CCI: dataBank.CCI, id: Not(dataBankId) },
          });

          if (existingCCI) {
            throw new ConflictException('CCI already exists');
          }

          // Actualiza el registro existente
          await this.technicianDataBankRepository.update(
            technicianDataBank.id,
            dataBank,
          );
        } else {
          // Crear un nuevo registro
          technicianDataBank =
            this.technicianDataBankRepository.create(dataBank);

          // Verificar unicidad de accountNumber y CCI
          const existingAccountNumber =
            await this.technicianDataBankRepository.findOne({
              where: { accountNumber: technicianDataBank.accountNumber },
            });

          if (existingAccountNumber) {
            throw new ConflictException('Account Number already exists');
          }

          const existingCCI = await this.technicianDataBankRepository.findOne({
            where: { CCI: technicianDataBank.CCI },
          });

          if (existingCCI) {
            throw new ConflictException('CCI already exists');
          }

          await this.technicianDataBankRepository.save(technicianDataBank);
        }
      } else {
        // Crear un nuevo registro
        technicianDataBank = this.technicianDataBankRepository.create(dataBank);

        // Verificar unicidad de accountNumber y CCI
        const existingAccountNumber =
          await this.technicianDataBankRepository.findOne({
            where: { accountNumber: technicianDataBank.accountNumber },
          });

        if (existingAccountNumber) {
          throw new ConflictException('Account Number already exists');
        }

        const existingCCI = await this.technicianDataBankRepository.findOne({
          where: { CCI: technicianDataBank.CCI },
        });

        if (existingCCI) {
          throw new ConflictException('CCI already exists');
        }

        await this.technicianDataBankRepository.save(technicianDataBank);
      }
    }

    // Actualizar TechnicianDataPay
    await this.technicianDataPayRepository.update(id, {
      ...technicianDataPayData,
      dataBank: technicianDataBank,
    });

    return this.findOne(id);
  }

  async findOne(id: string): Promise<TechnicianDataPay> {
    const technicianDataPay = await this.technicianDataPayRepository.findOne({
      where: { id },
      relations: ['dataBank'],
    });

    if (!technicianDataPay) {
      throw new NotFoundException('TechnicianDataPay not found');
    }

    return technicianDataPay;
  }

  async remove(id: string): Promise<{ message: string }> {
    // Buscar el TechnicianDataPay antes de eliminarlo
    const technicianDataPay = await this.technicianDataPayRepository.findOne({
      where: { id },
      relations: ['dataBank'], // Asegúrate de que incluyes las relaciones necesarias
    });

    if (!technicianDataPay) {
      throw new NotFoundException(`TechnicianDataPay with ID ${id} not found`);
    }

    await this.technicianDataPayRepository.delete(id);

    let message = `TechnicianDataPay with ID ${id} has been deleted.`;
    if (technicianDataPay.dataBank) {
      message += ` DataBank ID associated: ${technicianDataPay.dataBank.id}`;
    }

    return {
      message,
    };
  }
}
