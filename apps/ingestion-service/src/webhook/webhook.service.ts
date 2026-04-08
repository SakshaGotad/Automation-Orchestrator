import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  async processWebhook(data: {
    provider: string;
    connectionId: string;
    payload: any;
  }) {
    const { provider, connectionId, payload } = data;

    console.log('--- Webhook Received ---');
    console.log('Provider:', provider);
    console.log('ConnectionId:', connectionId);
    console.log('Payload:', payload);

    // Later:
    // 1. Validate connection
    // 2. Match workflows
    // 3. Send to Kafka

    return {
      message: 'Webhook received successfully',
    };
  }
}