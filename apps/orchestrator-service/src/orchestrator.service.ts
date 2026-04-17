import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class OrchestratorService {
  constructor(private readonly prisma: PrismaService) {}

  async handleEvent(event: any) {
    const { workflowId, payload } = event;

    console.log(' Executing workflow:', workflowId);

    // 1. Fetch workflow actions
    const actions = await this.prisma.client.action.findMany({
      where: { workflowId },
      orderBy: { step: 'asc' },
    });

    // 2. Execute actions one by one
    for (const action of actions) {
      console.log(`⚙️ Executing step ${action.step}:`, action.app);

      // (for now just log)
      // Later: call real integrations
    }

    console.log('✅ Workflow execution completed');
  }
}