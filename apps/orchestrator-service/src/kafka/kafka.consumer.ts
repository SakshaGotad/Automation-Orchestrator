import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { OrchestratorService } from 'src/orchestrator.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  constructor(private readonly orchestrator: OrchestratorService) {}

  private kafka = new Kafka({
    clientId: 'orchestrator-service',
    brokers: ['localhost:9092'],
  });

  private consumer = this.kafka.consumer({
    groupId: 'workflow-consumer-group',
  });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'workflow.triggered',
      fromBeginning: false,
    });

    console.log('✅ Kafka Consumer Connected');

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) {
          console.warn('Received message with null value');
          return;
        }
        const event = JSON.parse(message.value.toString());

        console.log(' Event received:', event.workflowId);

        await this.orchestrator.handleEvent(event);
      },
    });
  }
}
