import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Controller('connections')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}


  @Get()
  findAll(@Query('userId') userId: string) {
    return this.connectionService.findAll(userId);
  }
}