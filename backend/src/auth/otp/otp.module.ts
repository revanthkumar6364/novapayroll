import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MailModule } from '../../mail/mail.module';
import { NotificationsModule } from '../../notifications/notifications.module';

@Module({
  imports: [MailModule, NotificationsModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
