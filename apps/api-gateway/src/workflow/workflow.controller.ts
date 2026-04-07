import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  create(@Body() dto: CreateWorkflowDto, @Query('userId') userId: string) {
    return this.workflowService.createWorkflow(userId, dto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.workflowService.getWorkflows(userId);
  }
}
