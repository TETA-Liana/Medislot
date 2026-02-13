import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHospitalDto } from './create-hospital.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
