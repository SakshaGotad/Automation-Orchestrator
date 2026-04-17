import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'ingestion-service',
    brokers: ['localhost:9092'],
  });

  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
    console.log('✅ Kafka Connected');
  }

  async sendEvent(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });

    console.log('📤 Sent to Kafka:', message.workflowId);
  }
}