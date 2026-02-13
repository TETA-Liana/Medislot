import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { SetAvailabilityDto } from './dto/set-availability.dto';
import { GetCurrentUser } from '../../common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all doctors (public)' })
  @ApiQuery({ name: 'specialty', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiResponse({ status: 200, description: 'List of doctors retrieved' })
  async getAllDoctors(
    @Query('specialty') specialty?: string,
    @Query('city') city?: string,
  ) {
    return this.doctorsService.getAllDoctors(specialty, city);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get doctor by ID (public)',
    description:
      'Retrieve doctor details by doctor profile ID (not user ID). Returns doctor information including hospital, specialties, and availability.',
  })
  @ApiResponse({ status: 200, description: 'Doctor details retrieved' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async getDoctorById(@Param('id') id: string) {
    return this.doctorsService.getDoctorById(id);
  }

  @Get(':id/availability')
  @Public()
  @ApiOperation({
    summary: 'Get doctor availability (public)',
    description:
      'Get availability schedule for a specific doctor by doctor profile ID. Optionally filter by date range. Default is today + 30 days.',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date (YYYY-MM-DD)',
  })
  @ApiResponse({ status: 200, description: 'Doctor availability retrieved' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async getAvailability(
    @Param('id') id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.doctorsService.getAvailability(id, startDate, endDate);
  }

  @Get('me/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get doctor profile (doctor only)' })
  @ApiResponse({ status: 200, description: 'Doctor profile retrieved' })
  @ApiResponse({ status: 404, description: 'Doctor profile not found' })
  async getDoctorProfile(@GetCurrentUser('id') userId: string) {
    return this.doctorsService.getDoctorProfile(userId);
  }

  @Put('me/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update doctor profile (doctor only)' })
  @ApiResponse({ status: 200, description: 'Doctor profile updated' })
  @ApiResponse({ status: 404, description: 'Doctor profile not found' })
  async updateDoctorProfile(
    @GetCurrentUser('id') userId: string,
    @Body() dto: UpdateDoctorProfileDto,
  ) {
    return this.doctorsService.updateDoctorProfile(userId, dto);
  }

  @Put('me/availability')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Set doctor availability (doctor only)',
    description:
      'Update your weekly schedule. IMPORTANT: The ID used in related endpoints is the **Doctor Profile ID**, not the User ID. Send a JSON ARRAY in the body.',
  })
  @ApiBody({
    description:
      'Array of availability slots. Format: [ { "dayOfWeek": 1, "startTime": "09:00", "endTime": "17:00" } ]',
    type: [SetAvailabilityDto],
  })
  @ApiResponse({ status: 200, description: 'Availability set successfully' })
  @ApiResponse({ status: 404, description: 'Doctor profile not found' })
  @ApiResponse({
    status: 400,
    description: 'Invalid format - must be an array of availability objects',
  })
  async setAvailability(
    @GetCurrentUser('id') userId: string,
    @Body() dto: SetAvailabilityDto[],
  ) {
    return this.doctorsService.setAvailability(userId, dto);
  }

  @Get('me/appointments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get doctor appointments (doctor only)' })
  @ApiResponse({ status: 200, description: 'Appointments retrieved' })
  async getDoctorAppointments(@GetCurrentUser('id') userId: string) {
    return this.doctorsService.getDoctorAppointments(userId);
  }
}
