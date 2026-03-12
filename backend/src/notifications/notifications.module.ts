import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationService } from './notification.service';
import { SmsService } from './sms.service';

@Module({
  imports: [],
  providers: [
    NotificationService, 
    SmsService,
    {
      provide: 'BullQueue_notifications',
      useValue: {
        add: async () => ({ id: 'mock-id' }),
        process: async () => {},
        on: () => {},
      },
    }
  ],
  exports: [NotificationService, SmsService],
})
export class NotificationsModule {}
