import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { GetCurrentUser } from '../../common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('doctors/pending')
  @ApiOperation({
    summary: 'Get pending doctor applications',
    description:
      'Retrieve all pending doctor applications. Returns doctor profile ID (not user ID) for approval/rejection.',
  })
  @ApiResponse({ status: 200, description: 'Pending doctors retrieved' })
  async getPendingDoctors() {
    return this.adminService.getPendingDoctors();
  }

  @Post('doctors/:id/approve')
  @ApiOperation({
    summary: 'Approve doctor application',
    description:
      'Approve a pending doctor application using doctor profile ID (not user ID). Sends approval email to doctor.',
  })
  @ApiResponse({ status: 200, description: 'Doctor approved successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async approveDoctor(@Param('id') doctorId: string) {
    return this.adminService.approveDoctor(doctorId);
  }

  @Post('doctors/:id/reject')
  @ApiOperation({
    summary: 'Reject doctor application',
    description:
      'Reject a pending doctor application using doctor profile ID (not user ID). Sends rejection email to doctor with optional reason.',
  })
  @ApiResponse({ status: 200, description: 'Doctor rejected successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async rejectDoctor(
    @Param('id') doctorId: string,
    @Body('reason') reason?: string,
  ) {
    return this.adminService.rejectDoctor(doctorId, reason);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get system statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved' })
  async getSystemStats() {
    return this.adminService.getSystemStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved' })
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Put('users/:id/toggle-status')
  @ApiOperation({ summary: 'Toggle user active status' })
  @ApiResponse({ status: 200, description: 'User status updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async toggleUserStatus(@Param('id') userId: string) {
    return this.adminService.toggleUserStatus(userId);
  }
}
