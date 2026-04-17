import { Controller, Post, Param } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';

@Controller('orchestrator')
export class AppController {
  constructor(private readonly orchestrator: OrchestratorService) {}

  @Post('execute/:workflowId')
  async execute(@Param('workflowId') workflowId: string) {
    await this.orchestrator.handleEvent({
      workflowId,
      payload: {},
    });

    return { message: 'Workflow triggered manually' };
  }
}