import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class OrchestratorService {
  constructor(private readonly prisma: PrismaService) {}


  async executeAction(action: any, payload: any) {
  switch (action.app) {
    case 'google-sheets':
      console.log('➡️ Writing to Google Sheets');
      break;

    case 'gmail':
      console.log('➡️ Sending Email');
      break;

    default:
      console.log('⚠️ Unknown action');
  }
}

  async handleEvent(event: any) {
    const { workflowId, payload } = event;

    console.log(' Executing workflow:', workflowId);

    const execution = await this.prisma.client.execution.create({
      data: {
        workflowId,
        status: 'running',
        startedAt: new Date(),
      },
    });
    try {
      // 1. Fetch workflow actions
      const actions = await this.prisma.client.action.findMany({
        where: { workflowId },
        orderBy: { step: 'asc' },
      });

      // 2. Execute actions one by one
      for (const action of actions) {
        let success = false;
        let attempts = 0;
        const maxRetries = 3;
        while(!success && attempts < maxRetries){
          try{
            attempts++;
             // (for now just log)
        // Later: call real integrations
            await this.executeAction(action, payload);
            success = true;
          }catch(error){
            console.error(`❌ Step ${action.step} failed:`, error.message);
            if(attempts >= maxRetries){
              throw error;
            }
          }
        }
        console.log(`⚙️ Executing step ${action.step}:`, action.app);

       
       
      }

      await this.prisma.client.execution.update({
        where: { id: execution.id },
        data: {
          status: 'success',
          completedAt: new Date(),
        },
      });
    } catch (error) {
      await this.prisma.client.execution.update({
        where: { id: execution.id },
        data: {
          status: 'failed',
          completedAt: new Date(),
        },
      });
    }

    console.log('✅ Workflow execution completed');
  }
}
