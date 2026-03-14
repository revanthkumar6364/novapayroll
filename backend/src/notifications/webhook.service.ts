import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookService {
  /**
   * Dispatches a notification to a Slack webhook.
   */
  async sendToSlack(webhookUrl: string, message: string, title?: string) {
    try {
      await axios.post(webhookUrl, {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: title ? `*${title}*\n${message}` : message,
            },
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('Slack webhook failed', error);
      return false;
    }
  }

  /**
   * Dispatches a notification to Microsoft Teams.
   */
  async sendToTeams(webhookUrl: string, message: string, title?: string) {
    try {
      await axios.post(webhookUrl, {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        themeColor: '0078D7',
        summary: title || 'NovaPayroll Notification',
        sections: [
          {
            activityTitle: title || 'NovaPayroll Notification',
            text: message,
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('Teams webhook failed', error);
      return false;
    }
  }

  /**
   * General notification dispatcher for payroll events.
   */
  async notifyPayrollEvent(orgId: string, eventType: string, data: any) {
    // In a production environment, we'd fetch the org's configured webhooks from the DB.
    // For this demo, we'll use a placeholder or check environment variables.
    const message = `🚀 *Payroll Alert*: ${eventType}\nPeriod: ${data.month}/${data.year}\nTotal Disbursed: ₹${data.totalNetPay.toLocaleString()}`;

    console.log(`[Webhook Dispatch] Org: ${orgId} | Event: ${eventType}`, data);

    // Simulating Slack dispatch if a webhook is found
    const demoWebhook = process.env.SLACK_WEBHOOK_URL;
    if (demoWebhook) {
      await this.sendToSlack(
        demoWebhook,
        message,
        'NovaPayroll Ecosystem Alert',
      );
    }
  }
}
