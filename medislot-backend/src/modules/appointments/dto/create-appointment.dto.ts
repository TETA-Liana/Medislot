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

export class CreateAppointmentDto {
  @ApiProperty({
    example: 'doctor-uuid-123',
    description: 'Doctor profile ID (not user ID)',
  })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: '2024-12-25T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(15)
  duration?: number;

  @ApiProperty({ example: 'hospital-uuid-123', required: false })
  @IsOptional()
  @IsString()
  hospitalId?: string;

  @ApiProperty({ example: 'Follow-up consultation', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 'Headache and fever', required: false })
  @IsOptional()
  @IsString()
  symptoms?: string;
}
