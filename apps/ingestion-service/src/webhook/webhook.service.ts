import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}
  async processWebhook(data: {
    app: string;
    connectionId: string;
    payload: any;
  }) {
    const { app, connectionId, payload } = data;

    console.log('--- Webhook Received ---');
    console.log('Provider:', app);
    console.log('ConnectionId:', connectionId);
    console.log('Payload:', payload);
    

    // Later:
    // 1. Validate connection
    const connection = await this.prisma.client.connection.findUnique({
      where: { id: connectionId },
    });
    console.log('useId',connection?.userId)
    if (!connection) {
      throw new NotFoundException(
        `Connection with ID ${connectionId} not found`,
      );
    }
   
    const userId = connection.userId;
    const event = payload.event || payload.action || 'unknown';
    const triggerType = `${app}.${event}`;
    // 2. Match workflows
    const workflows = await this.prisma.client.workflow.findMany({
      where: {
        userId,
        triggers: {
          some: {
          app: app,
        event: event,
        connectionId: connectionId,
          },
        },
      },
      include: {
        triggers: true,
     
      },
    });
    // 3. Send to Kafka
    console.log('matched workflow',workflows.length)

    return {
      message: 'Webhook received successfully',
    };
  }
}
