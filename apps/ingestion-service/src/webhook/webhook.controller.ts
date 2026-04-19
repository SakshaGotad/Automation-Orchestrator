import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { RegisterWebhookService } from './register-webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor (private readonly webhookService: WebhookService ,
        private readonly registerWebhookService: RegisterWebhookService
    ) {}

    @Post(':app')
    async handleWebhook(@Param('app') app: string, 
    @Query('connectionId') connectionId: string,
    @Body() payload: any) {
        return this.webhookService.processWebhook({ app, connectionId, payload });
    }

   @Post('register-webhook')
async registerWebhook(@Body() body: any) {
  return this.registerWebhookService.registerWebhook(body);
}
}
