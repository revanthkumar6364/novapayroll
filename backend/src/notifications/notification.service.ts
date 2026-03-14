import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
  ) {}

  async queueNotification(
    userId: string,
    template: string,
    payload: Record<string, any>,
    orgId?: string,
  ) {
    // 1. Get user preferences
    const pref = await this.prisma.notificationPreference.findUnique({
      where: { userId },
    });

    const channel = pref?.whatsappEnabled ? 'WHATSAPP' : 'EMAIL';

    // 2. Create outbox record
    const outbox = await this.prisma.notificationOutbox.create({
      data: {
        userId,
        orgId,
        channel,
        template,
        payload,
        status: 'PENDING',
      },
    });

    // 3. Add to BullMQ
    await this.notificationQueue.add(
      'notifications.dispatch',
      {
        outboxId: outbox.id,
      },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 1000 },
      },
    );

    return outbox;
  }
}
