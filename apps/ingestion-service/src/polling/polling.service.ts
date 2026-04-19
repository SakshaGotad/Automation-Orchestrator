import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/database/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class PollingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}

  // ⏱ runs every 30 seconds
  @Cron('*/30 * * * * *')
  async handlePolling() {
    console.log('⏱️ Polling started...');

    // 1. fetch google-form triggers
    const triggers = await this.prisma.client.trigger.findMany({
      where: {
        app: 'google-forms',
      },
    });

    for (const trigger of triggers) {
      await this.handleGoogleForms(trigger);
    }
  }

  async handleGoogleForms(trigger: any) {
    const { config, workflowId } = trigger;

    const formId = config.formId;
    const lastResponseId = config.lastResponseId || null;

    console.log(`📄 Checking form: ${formId}`);

        // 🔴 MOCK API RESPONSE (replace later)
    const responses = [
      { id: 'resp_001' },
      { id: 'resp_002' },
    ];

    // find new responses
    const newResponses = lastResponseId
      ? responses.filter((r) => r.id > lastResponseId)
      : responses;

          for (const response of newResponses) {
      console.log('🆕 New response:', response.id);

      await this.kafkaService.sendEvent('workflow.triggered', {
        workflowId,
        trigger: {
          app: 'google-forms',
          event: 'new_response',
        },
        payload: response,
        timestamp: new Date().toISOString(),
      });

            await this.prisma.client.trigger.update({
        where: { id: trigger.id },
        data: {
          config: {
            ...config,
            lastResponseId: response.id,
          },
        },
      });
    }
  }
}