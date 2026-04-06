import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Controller('connections')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  create(@Body() dto: CreateConnectionDto) {
    const userId = 'user_1';
    return this.connectionService.create(userId, dto.provider);
  }

  @Get()
  findAll() {
    const userId = 'user_1';
    return this.connectionService.findAll(userId);
  }
}