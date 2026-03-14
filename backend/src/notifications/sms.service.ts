import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async sendSms(to: string, message: string) {
    // Mock SMS sending log
    console.log(`[Mock SMS] Sending to ${to}: ${message}`);
    await Promise.resolve();
    return {
      success: true,
      messageId: Math.random().toString(36).substring(7),
    };
  }

  async sendOtp(to: string, otp: string) {
    return this.sendSms(
      to,
      `Your OTP for Nova Payroll is ${otp}. Valid for 5 minutes.`,
    );
  }
}
