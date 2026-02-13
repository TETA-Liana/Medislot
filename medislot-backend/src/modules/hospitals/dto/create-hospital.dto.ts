import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateHospitalDto {
  @ApiProperty({ example: 'City General Hospital' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Medical Center Blvd' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'contact@hospital.com' })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty({ example: '+1 (555) 123-4567' })
  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsOptional()
  @IsUrl()
  logo?: string;
}
