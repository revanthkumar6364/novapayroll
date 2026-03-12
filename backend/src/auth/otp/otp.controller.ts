import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('auth')
export class OtpController {
  constructor(private readonly otpService: OtpService) { }

  @Post('otp/request')
  async request(@Body('destination') destination: string) {
    return this.otpService.requestOtp(destination);
  }

  @Post('otp/verify')
  async verify(
    @Body('destination') destination: string,
    @Body('otp') otp: string,
  ) {
    return this.otpService.verifyOtp(destination, otp);
  }
}
