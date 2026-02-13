import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT'),
      secure: this.config.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });
  }

  private async logEmail(
    to: string,
    subject: string,
    template: string,
    status: 'PENDING' | 'SENT' | 'FAILED',
    error?: string,
  ) {
    try {
      await this.prisma.emailLog.create({
        data: {
          to,
          subject,
          template,
          status,
          error,
          sentAt: status === 'SENT' ? new Date() : null,
        },
      });
    } catch (error) {
      this.logger.error('Failed to log email', error);
    }
  }

  async sendDoctorApprovalEmail(to: string, doctorName: string) {
    const subject = 'Welcome to MediSlot - Your Account is Approved!';
    const from = this.config.get('EMAIL_FROM') || 'noreply@medislot.com';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediSlot Healthcare Platform</h1>
          </div>
          <div class="content">
            <h2>Welcome, Dr. ${doctorName}!</h2>
            <p>We're excited to inform you that your MediSlot doctor account has been approved!</p>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Log in to your account using your credentials</li>
              <li>Set up your weekly availability schedule</li>
              <li>Complete your profile with additional details</li>
              <li>Start receiving appointment requests from patients</li>
            </ol>
            
            <p>You can now access all doctor features including:</p>
            <ul>
              <li> Manage your appointment calendar</li>
              <li> View patient appointments and details</li>
              <li> Set your consultation fees and specialties</li>
              <li> View your appointment history and earnings</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${this.config.get('FRONTEND_URL')}/doctor/dashboard" class="button">Go to Dashboard</a>
            </div>
            
            <p>If you have any questions or need assistance, please contact our support team.</p>
            
            <p>Best regards,<br>The MediSlot Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} MediSlot Healthcare Platform. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.logEmail(to, subject, 'doctor-approval', 'PENDING');

      await this.transporter.sendMail({
        from,
        to,
        subject,
        html,
      });

      await this.logEmail(to, subject, 'doctor-approval', 'SENT');
      this.logger.log(`Approval email sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send approval email to ${to}`, error);
      await this.logEmail(
        to,
        subject,
        'doctor-approval',
        'FAILED',
        error.message,
      );
      return false;
    }
  }

  async sendDoctorRejectionEmail(
    to: string,
    doctorName: string,
    reason?: string,
  ) {
    const subject = 'MediSlot - Doctor Application Update';
    const from = this.config.get('EMAIL_FROM') || 'noreply@medislot.com';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediSlot Healthcare Platform</h1>
          </div>
          <div class="content">
            <h2>Application Status Update</h2>
            <p>Dear Dr. ${doctorName},</p>
            
            <p>We regret to inform you that your application to join MediSlot as a healthcare provider could not be approved at this time.</p>
            
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            
            <p>This decision may be due to various factors including verification requirements, current platform needs, or application completeness.</p>
            
            <p>If you believe this decision was made in error, or if you have additional information to provide, please contact our support team for review.</p>
            
            <p>We appreciate your interest in joining our platform and wish you the best in your medical practice.</p>
            
            <p>Sincerely,<br>The MediSlot Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} MediSlot Healthcare Platform. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.logEmail(to, subject, 'doctor-rejection', 'PENDING');

      await this.transporter.sendMail({
        from,
        to,
        subject,
        html,
      });

      await this.logEmail(to, subject, 'doctor-rejection', 'SENT');
      this.logger.log(`Rejection email sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send rejection email to ${to}`, error);
      await this.logEmail(
        to,
        subject,
        'doctor-rejection',
        'FAILED',
        error.message,
      );
      return false;
    }
  }

  async sendAppointmentBookingEmail(
    doctorEmail: string,
    doctorName: string,
    patientName: string,
    appointmentDate: Date,
    appointmentDuration: number,
  ) {
    const subject = 'New Appointment Booking - MediSlot';
    const from = this.config.get('EMAIL_FROM') || 'noreply@medislot.com';

    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px; }
          .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
          .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 New Appointment Booked</h1>
          </div>
          <div class="content">
            <h2>Hello, Dr. ${doctorName}!</h2>
            <p>You have a new appointment booking on MediSlot.</p>
            
            <div class="appointment-details">
              <h3>Appointment Details:</h3>
              <p><strong>Patient:</strong> ${patientName}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${formattedTime}</p>
              <p><strong>Duration:</strong> ${appointmentDuration} minutes</p>
            </div>
            
            <p>Please log in to your dashboard to view more details and manage your appointments.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${this.config.get('FRONTEND_URL')}/doctor/appointments" class="button">View Appointments</a>
            </div>
            
            <p>Best regards,<br>The MediSlot Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} MediSlot Healthcare Platform. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.logEmail(
        doctorEmail,
        subject,
        'appointment-booking',
        'PENDING',
      );

      await this.transporter.sendMail({
        from,
        to: doctorEmail,
        subject,
        html,
      });

      await this.logEmail(doctorEmail, subject, 'appointment-booking', 'SENT');
      this.logger.log(`Appointment booking email sent to ${doctorEmail}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send appointment booking email to ${doctorEmail}`,
        error,
      );
      await this.logEmail(
        doctorEmail,
        subject,
        'appointment-booking',
        'FAILED',
        error.message,
      );
      return false;
    }
  }
}
