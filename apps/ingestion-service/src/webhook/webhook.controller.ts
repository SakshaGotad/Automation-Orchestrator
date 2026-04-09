import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor (private readonly webhookService: WebhookService) {}

    @Post(':app')
    async handleWebhook(@Param('app') app: string, 
    @Query('connectionId') connectionId: string,
    @Body() payload: any) {
        return this.webhookService.processWebhook({ app, connectionId, payload });
    }
}
