import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class UpdateDoctorProfileDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Cardiology', required: false })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experienceYears?: number;

  @ApiProperty({ example: 150, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  consultationFee?: number;

  @ApiProperty({ example: 'Experienced cardiologist...', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'hospital-uuid-123', required: false })
  @IsOptional()
  @IsString()
  hospitalId?: string;
}
