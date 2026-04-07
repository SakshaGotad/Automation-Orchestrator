import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { PrismaModule } from '../modules/database/prisma.module';

@Module({
  providers: [WorkflowService],
  controllers: [WorkflowController],
  imports: [PrismaModule],
})
export class WorkflowModule {}
