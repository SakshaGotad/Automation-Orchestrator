import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

export type GoogleOAuthUser = {
  userId: string;
  provider: 'google';
  accessToken: string;
  refreshToken?: string;
  email?: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL =
      configService.get<string>('GOOGLE_CALLBACK_URL') ??
      'http://localhost:3003/auth/google/callback';

    if (!clientID || !clientSecret) {
      throw new Error(
        'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be defined.',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['profile', 'email'],
    });
  }

  authorizationParams(): Record<string, string> {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  validate(
    accessToken: string,
    refreshToken: string | undefined,
    profile: Profile,
  ): GoogleOAuthUser {
    if (!profile?.id) {
      throw new UnauthorizedException('Google profile id missing in callback.');
    }

    return {
      userId: profile.id,
      provider: 'google',
      accessToken,
      refreshToken,
      email: profile.emails?.[0]?.value,
    };
  }
}
