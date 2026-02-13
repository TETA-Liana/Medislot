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

export class CancelAppointmentDto {
  @ApiProperty({ example: 'I need to reschedule', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
