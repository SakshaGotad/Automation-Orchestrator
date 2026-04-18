import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { PrismaModule } from './database/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PollingService } from './polling/polling.service';

@Module({
  imports: [WebhookModule, PrismaModule, KafkaModule,ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService,PollingService],
  
})
export class AppModule {}
