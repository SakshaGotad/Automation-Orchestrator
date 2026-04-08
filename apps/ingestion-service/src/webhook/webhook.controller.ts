import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor (private readonly webhookService: WebhookService) {}

    @Post(':provider')
    async handleWebhook(@Param('provider') provider: string, 
    @Query('connectionId') connectionId: string,
    @Body() payload: any) {
        return this.webhookService.processWebhook({ provider, connectionId, payload });
    }
}
