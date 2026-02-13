import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get role-based dashboard overview' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved' })
  async getDashboardOverview(@GetUser() user: any) {
    return this.dashboardService.getDashboardData(user.id, user.role);
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Get calendar events' })
  @ApiQuery({
    name: 'start',
    required: true,
    description: 'Start date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'end',
    required: true,
    description: 'End date (YYYY-MM-DD)',
  })
  @ApiResponse({ status: 200, description: 'Calendar events retrieved' })
  async getCalendarEvents(
    @GetUser() user: any,
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.dashboardService.getCalendarEvents(
      user.id,
      user.role,
      startDate,
      endDate,
    );
  }
}
