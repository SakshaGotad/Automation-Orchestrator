import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from './modules/connection/connection.module';
import { PrismaModule } from './modules/database/prisma.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [PrismaModule, ConnectionModule, AuthModule, WorkflowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
