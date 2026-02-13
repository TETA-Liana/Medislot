import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterDoctorDto {
  @ApiProperty({ example: 'dr.john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @ApiProperty({ example: 'MD123456' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experienceYears?: number;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  consultationFee?: number;

  @ApiProperty({ example: 'Experienced cardiologist...', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example: 'hospital-uuid-123',
    description: 'Optional: Hospital where doctor will practice',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  hospitalId?: string;
}
