import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BotService } from './bot.service';

interface WhatsAppWebhookBody {
  entry?: {
    changes?: {
      value?: {
        messages?: {
          from: string;
          type: string;
          text?: { body: string };
          image?: { url: string };
        }[];
      };
    }[];
  }[];
}

interface SlackWebhookBody {
  type: string;
  challenge?: string;
  event?: {
    type: string;
    bot_id?: string;
    user: string;
    text: string;
    files?: any[];
  };
}

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('whatsapp')
  async handleWhatsAppWebhook(@Body() body: WhatsAppWebhookBody) {
    // Basic verification and message extraction for Meta WhatsApp API
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (message) {
      const payload = {
        from: message.from,
        type: message.type,
        text: message.text?.body || '',
        mediaUrl: message.image?.url || '',
      };
      return this.botService.processIncomingMessage('whatsapp', payload);
    }
    return { status: 'OK' };
  }

  @Post('web')
  async handleWebMessage(@Body() body: { message: string }) {
    return this.botService.processWebMessage(body.message);
  }

  @Post('slack')
  async handleSlackWebhook(@Body() body: SlackWebhookBody) {
    // Slack Event API handling
    if (body.type === 'url_verification') {
      return { challenge: body.challenge };
    }

    const event = body.event;
    if (event && event.type === 'message' && !event.bot_id) {
      const payload = {
        user: event.user,
        text: event.text,
        attachments: event.files,
      };
      return this.botService.processIncomingMessage('slack', payload);
    }
    return { status: 'OK' };
  }

  // Meta Webhook Verification
  @Get('whatsapp')
  verifyWhatsApp(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    if (mode === 'subscribe' && token === 'NOVAPAYROLL_BOT_SECRET') {
      return challenge;
    }
    return 'Forbidden';
  }
}
