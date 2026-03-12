import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private readonly botService: BotService) { }

    @Post('whatsapp')
    async handleWhatsAppWebhook(@Body() body: any) {
        // Basic verification and message extraction for Meta WhatsApp API
        const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        if (message) {
            const payload = {
                from: message.from,
                type: message.type,
                text: message.text?.body,
                mediaUrl: message.image?.url // In production, would need separate download step
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
    async handleSlackWebhook(@Body() body: any) {
        // Slack Event API handling
        if (body.type === 'url_verification') {
            return { challenge: body.challenge };
        }

        if (body.event && body.event.type === 'message' && !body.event.bot_id) {
            const payload = {
                user: body.event.user,
                text: body.event.text,
                attachments: body.event.files
            };
            return this.botService.processIncomingMessage('slack', payload);
        }
        return { status: 'OK' };
    }

    // Meta Webhook Verification
    @Get('whatsapp')
    verifyWhatsApp(@Query('hub.mode') mode: string, @Query('hub.verify_token') token: string, @Query('hub.challenge') challenge: string) {
        if (mode === 'subscribe' && token === 'NOVAPAYROLL_BOT_SECRET') {
            return challenge;
        }
        return 'Forbidden';
    }
}
