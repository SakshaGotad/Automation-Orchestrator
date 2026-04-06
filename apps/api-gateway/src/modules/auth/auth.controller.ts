import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleOAuthUser } from './google.strategy';
import { ConnectionService } from '../connection/connection.service';

type GoogleCallbackRequest = Request & {
  user?: GoogleOAuthUser;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(): void {
    // Passport guard handles redirect to Google.
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: GoogleCallbackRequest) {
    const oauthUser = req.user;

    if (!oauthUser) {
      throw new UnauthorizedException('Google OAuth authentication failed.');
    }

    const connection =
      await this.connectionService.upsertGoogleConnection(oauthUser.userId, {
        accessToken: oauthUser.accessToken,
        refreshToken: oauthUser.refreshToken,
      });
    return {
      success: true,
      connectionId: connection.id,
      provider: oauthUser.provider,
      userId: connection.userId,
      connectedAt: connection.createdAt,
    };
  }
}
