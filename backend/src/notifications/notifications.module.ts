import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationService } from './notification.service';
import { SmsService } from './sms.service';
import { WebhookService } from './webhook.service';

@Module({
  imports: [],
  providers: [
    NotificationService,
    SmsService,
    WebhookService,
    {
      provide: 'BullQueue_notifications',
      useValue: {
        add: async () => ({ id: 'mock-id' }),
        process: async () => {},
        on: () => {},
      },
    },
  ],
  exports: [NotificationService, SmsService, WebhookService],
})
export class NotificationsModule {}
