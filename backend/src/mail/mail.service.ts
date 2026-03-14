import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: this.config.get<number>('SMTP_PORT'),
        auth: {
          user: this.config.get<string>('SMTP_USER'),
          pass: this.config.get<string>('SMTP_PASS'),
        },
      });
    } else {
      this.logger.warn(
        'SMTP_HOST not found. MailService will fall back to console logging.',
      );
    }
  }

  async sendOtp(to: string, otp: string) {
    const mailOptions = {
      from: '"Nova Payroll" <no-reply@novapayroll.com>',
      to,
      subject: 'Your OTP for Nova Payroll',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; background-color: #f8faff; border-radius: 24px;">
          <h1 style="color: #0c0f1d; font-weight: 800;">Verify your email</h1>
          <p style="color: #64748b; font-size: 16px;">Use the following OTP to complete your NovaPayroll setup:</p>
          <div style="display: inline-block; padding: 12px 24px; background-color: #245df1; color: white; border-radius: 12px; font-size: 32px; font-weight: 800; letter-spacing: 4px; margin: 24px 0;">
            ${otp}
          </div>
          <p style="color: #94a3b8; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    if (this.transporter) {
      try {
        await this.transporter.sendMail(mailOptions);
        this.logger.log(`OTP sent to ${to}`);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(`Failed to send email to ${to}: ${errorMessage}`);
        this.logToConsole(mailOptions);
      }
    } else {
      this.logToConsole(mailOptions);
    }
  }

  async sendNotification(to: string, subject: string, body: string) {
    const mailOptions = {
      from: '"Nova Payroll" <no-reply@novapayroll.com>',
      to,
      subject,
      text: body,
      html: body,
    };

    if (this.transporter) {
      try {
        await this.transporter.sendMail(mailOptions);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(
          `Failed to send notification to ${to}: ${errorMessage}`,
        );
        this.logToConsole(mailOptions);
      }
    } else {
      this.logToConsole(mailOptions);
    }
  }

  private logToConsole(options: { to: string; subject: string; text: string }) {
    this.logger.log(`
[DEVELOPMENT MODE - EMAIL]
To: ${options.to}
Subject: ${options.subject}
Body: ${options.text}
--------------------------
    `);
  }
}
