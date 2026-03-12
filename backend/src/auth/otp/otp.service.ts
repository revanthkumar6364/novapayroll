import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../../mail/mail.service';
import { SmsService } from '../../notifications/sms.service';

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private smsService: SmsService,
  ) {}

  async requestOtp(destination: string, channel: string = 'email') {
    // Rate limit resend (60s)
    const recentRequest = await this.prisma.otpRequest.findFirst({
      where: {
        destination,
        createdAt: { gte: new Date(Date.now() - 60000) },
      },
    });

    if (recentRequest) {
      throw new ConflictException(
        'Please wait 60 seconds before requesting another OTP',
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes

    const request = await this.prisma.otpRequest.create({
      data: {
        destination,
        channel,
        otpHash,
        expiresAt,
      },
    });

    // Send via selected channel
    if (channel === 'phone') {
      await this.smsService.sendOtp(destination, otp);
    } else {
      await this.mailService.sendOtp(destination, otp);
    }

    return { id: request.id, expiresAt };
  }

  async verifyOtp(destination: string, otp: string) {
    const request = await this.prisma.otpRequest.findFirst({
      where: {
        destination,
        status: 'PENDING',
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!request) {
      throw new BadRequestException('OTP expired or not found');
    }

    if (request.attempts >= 5) {
      await this.prisma.otpRequest.update({
        where: { id: request.id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('Too many failed attempts');
    }

    const isValid = await bcrypt.compare(otp, request.otpHash);

    if (!isValid) {
      await this.prisma.otpRequest.update({
        where: { id: request.id },
        data: { attempts: { increment: 1 } },
      });
      throw new BadRequestException('Invalid OTP');
    }

    await this.prisma.otpRequest.update({
      where: { id: request.id },
      data: { status: 'VERIFIED' },
    });

    return true;
  }
}
