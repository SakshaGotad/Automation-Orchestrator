import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { ConnectionModule } from '../connection/connection.module';
import { ConnectionService } from '../connection/connection.service';

@Module({
  imports: [PassportModule.register({ session: false }), ConnectionModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, ConnectionService],
})
export class AuthModule {}
