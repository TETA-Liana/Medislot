import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SetAvailabilityDto {
  @ApiProperty({
    example: 1,
    description:
      'Day of week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday',
    minimum: 0,
    maximum: 6,
  })
  @IsNumber()
  dayOfWeek: number;

  @ApiProperty({
    example: '09:00',
    description: 'Start time in HH:mm format (24-hour)',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time in HH:mm format (24-hour)',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsString()
  endTime: string;
}
