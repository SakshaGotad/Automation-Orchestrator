import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { PrismaService } from '../modules/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class WorkflowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

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
      const trigger = await tx.trigger.create({
        data: {
          workflowId: workflow.id,
          app: dto.trigger.app,
          event: dto.trigger.event,
          config: dto.trigger.config,
          connectionId: dto.trigger.connectionId,
        },
      });

      if (trigger.app === 'github') {
        await firstValueFrom(
          this.httpService.post(
            'http://localhost:3001/webhook/register-webhook', // ingestion-service URL
            {
              app: trigger.app,
              connectionId: trigger.connectionId,
              trigger,
            },
          ),
        );
      }

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
