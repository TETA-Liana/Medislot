import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class RescheduleAppointmentDto {
  @ApiProperty({ example: '2024-12-26T14:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  newDate: string;
}
