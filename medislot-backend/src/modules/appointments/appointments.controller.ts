import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole, AppointmentStatus } from '@prisma/client';

@ApiTags('Appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Book an appointment (patient only)' })
  @ApiResponse({ status: 201, description: 'Appointment booked successfully' })
  @ApiResponse({ status: 400, description: 'Invalid appointment details' })
  @ApiResponse({ status: 404, description: 'Doctor or patient not found' })
  async createAppointment(
    @GetUser('id') userId: string,
    @Body() dto: CreateAppointmentDto,
  ) {
    return this.appointmentsService.createAppointment(userId, dto);
  }

  @Get('my-appointments')
  @ApiOperation({ summary: 'Get user appointments' })
  @ApiQuery({ name: 'status', required: false, enum: AppointmentStatus })
  @ApiResponse({ status: 200, description: 'Appointments retrieved' })
  async getPatientAppointments(
    @GetUser('id') userId: string,
    @Query('status') status?: AppointmentStatus,
  ) {
    return this.appointmentsService.getPatientAppointments(userId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  @ApiResponse({ status: 200, description: 'Appointment retrieved' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async getAppointmentById(
    @GetUser('id') userId: string,
    @Param('id') appointmentId: string,
  ) {
    return this.appointmentsService.getAppointmentById(userId, appointmentId);
  }

  @Put(':id/reschedule')
  @Roles(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reschedule appointment (patient only)' })
  @ApiResponse({ status: 200, description: 'Appointment rescheduled' })
  @ApiResponse({ status: 400, description: 'Invalid reschedule request' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async rescheduleAppointment(
    @GetUser('id') userId: string,
    @Param('id') appointmentId: string,
    @Body() dto: RescheduleAppointmentDto,
  ) {
    return this.appointmentsService.rescheduleAppointment(
      userId,
      appointmentId,
      dto,
    );
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel appointment (patient or doctor)' })
  @ApiResponse({ status: 200, description: 'Appointment cancelled' })
  @ApiResponse({ status: 400, description: 'Invalid cancellation request' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async cancelAppointment(
    @GetUser('id') userId: string,
    @Param('id') appointmentId: string,
    @Body() dto: CancelAppointmentDto,
  ) {
    return this.appointmentsService.cancelAppointment(
      userId,
      appointmentId,
      dto,
    );
  }

  @Put(':id/status')
  @Roles(UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update appointment status (doctor only)' })
  @ApiResponse({ status: 200, description: 'Appointment status updated' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async updateAppointmentStatus(
    @GetUser('id') userId: string,
    @Param('id') appointmentId: string,
    @Body('status') status: AppointmentStatus,
  ) {
    return this.appointmentsService.updateAppointmentStatus(
      userId,
      appointmentId,
      status,
    );
  }
}
