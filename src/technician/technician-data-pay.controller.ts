import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TechnicianDataPayService } from './technician-data-pay.service';
import { CreateTechnicianDataPayDto } from './technician-data-pay-create.dto';
import { UpdateTechnicianDataPayDto } from './technician-data-pay-update.dto';

@Controller('technician-data-pay')
export class TechnicianDataPayController {
  constructor(
    private readonly technicianDataPayService: TechnicianDataPayService,
  ) {}

  @Post()
  create(@Body() createTechnicianDataPayDto: CreateTechnicianDataPayDto) {
    return this.technicianDataPayService.create(createTechnicianDataPayDto);
  }

  @Get()
  findAll() {
    return this.technicianDataPayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicianDataPayService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTechnicianDataPayDto: UpdateTechnicianDataPayDto,
  ) {
    return this.technicianDataPayService.update(id, updateTechnicianDataPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicianDataPayService.remove(id);
  }
}
