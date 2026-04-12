import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { PrismaModule } from './database/prisma.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [WebhookModule, PrismaModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
