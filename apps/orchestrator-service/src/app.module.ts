import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { PrismaModule } from './database/prisma.module';
import { KafkaConsumerService } from './kafka/kafka.consumer';
import { OrchestratorService } from './orchestrator.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [KafkaModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService,KafkaConsumerService,OrchestratorService],
})
export class AppModule {}
