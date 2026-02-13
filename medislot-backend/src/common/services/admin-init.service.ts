import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminInitService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminInitService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    console.log('[AdminInit] Application bootstrap started...');
    await this.initializeAdmin();
  }

  private async initializeAdmin() {
    try {
      console.log('[AdminInit] Checking for Super Admin account...');
      this.logger.log('Checking for Super Admin account...');

      const adminEmail = this.config.get<string>('ADMIN_EMAIL');
      const adminPassword = this.config.get<string>('ADMIN_PASSWORD');

      console.log(`[AdminInit] Admin Email from config: ${adminEmail}`);

      if (!adminEmail || !adminPassword) {
        const errorMsg = 'ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables. Skipping admin initialization.';
        console.warn(`[AdminInit] ${errorMsg}`);
        this.logger.warn(errorMsg);
        return;
      }

      const existingAdmin = await this.prisma.user.findFirst({
        where: {
          email: adminEmail,
          role: UserRole.ADMIN,
        },
      });

      if (existingAdmin) {
        console.log('[AdminInit] Super Admin account already exists.');
        this.logger.log('Super Admin account already exists.');
        return;
      }

      console.log('[AdminInit] Super Admin account not found. Creating one...');
      this.logger.log('Super Admin account not found. Creating one...');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      await this.prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: 'System',
          lastName: 'Admin',
          role: UserRole.ADMIN,
          isActive: true,
        },
      });

      const successMsg = `Super Admin account created successfully: ${adminEmail}`;
      console.log(`[AdminInit] ${successMsg}`);
      this.logger.log(successMsg);
    } catch (error) {
      console.error('[AdminInit] Failed to initialize admin account:', error);
      this.logger.error('Failed to initialize admin account:', error);
    }
  }
}
