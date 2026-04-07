import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { PrismaService } from '../modules/database/prisma.service';

@Injectable()
export class WorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkflow(userId: string, dto: CreateWorkflowDto) {
    return this.prisma.client.$transaction(async (tx) => {
      
      // 1. Create Workflow
      const workflow = await tx.workflow.create({
        data: {
          name: dto.name,
          userId,
        },
      });

      // 2. Create Trigger
      await tx.trigger.create({
        data: {
          workflowId: workflow.id,
          app: dto.trigger.app,
          event: dto.trigger.event,
          config: dto.trigger.config,
          connectionId: dto.trigger.connectionId,
        },
      });

      // 3. Create Actions
      await tx.action.createMany({
        data: dto.actions.map((action) => ({
          workflowId: workflow.id,
          step: action.step,
          app: action.app,
          event: action.event,
          config: action.config,
          connectionId: action.connectionId,
        })),
      });

      return workflow;
    });
  }

  async getWorkflows(userId: string) {
    return this.prisma.client.workflow.findMany({
      where: { userId },
      include: {
        triggers: true,
        actions: {
          orderBy: { step: 'asc' },
        },
      },
    });
  }
}