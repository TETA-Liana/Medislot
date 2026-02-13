import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
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
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { GetCurrentUser } from '../../common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Hospitals')
@Controller('hospitals')
export class HospitalsController {
  constructor(private hospitalsService: HospitalsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all hospitals (public)' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of hospitals retrieved' })
  async getAllHospitals(
    @Query('city') city?: string,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.hospitalsService.getAllHospitals(city, isActive);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get hospital by ID (public)' })
  @ApiResponse({ status: 200, description: 'Hospital details retrieved' })
  @ApiResponse({ status: 404, description: 'Hospital not found' })
  async getHospitalById(@Param('id') id: string) {
    return this.hospitalsService.getHospitalById(id);
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get hospital statistics' })
  @ApiResponse({ status: 200, description: 'Hospital stats retrieved' })
  @ApiResponse({ status: 404, description: 'Hospital not found' })
  async getHospitalStats(@Param('id') id: string) {
    return this.hospitalsService.getHospitalStats(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new hospital (admin only)' })
  @ApiResponse({ status: 201, description: 'Hospital created successfully' })
  @ApiResponse({ status: 409, description: 'Hospital already exists' })
  async createHospital(@Body() dto: CreateHospitalDto) {
    return this.hospitalsService.createHospital(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update hospital (admin only)' })
  @ApiResponse({ status: 200, description: 'Hospital updated successfully' })
  @ApiResponse({ status: 404, description: 'Hospital not found' })
  @ApiResponse({ status: 409, description: 'Hospital name conflict' })
  async updateHospital(
    @Param('id') id: string,
    @Body() dto: UpdateHospitalDto,
  ) {
    return this.hospitalsService.updateHospital(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete hospital (admin only)' })
  @ApiResponse({ status: 200, description: 'Hospital deleted successfully' })
  @ApiResponse({ status: 404, description: 'Hospital not found' })
  @ApiResponse({ status: 409, description: 'Hospital has associated doctors' })
  async deleteHospital(@Param('id') id: string) {
    return this.hospitalsService.deleteHospital(id);
  }

  @Put(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Toggle hospital active status (admin only)' })
  @ApiResponse({ status: 200, description: 'Hospital status updated' })
  @ApiResponse({ status: 404, description: 'Hospital not found' })
  async toggleHospitalStatus(@Param('id') id: string) {
    return this.hospitalsService.toggleHospitalStatus(id);
  }
}
