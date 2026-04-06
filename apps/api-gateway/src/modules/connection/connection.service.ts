import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, provider: string) {
    return this.prisma.connection.create({
      data: {
        userId,
        provider,
        accessToken: '',
      },
    });
  }
  async upsertGoogleConnection(
    userId: string,
    data: { accessToken: string; refreshToken?: string },
  ) {
    const existing = await this.prisma.connection.findFirst({
      where: { userId, provider: 'google' },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) {
      return this.prisma.connection.update({
        where: { id: existing.id },
        data: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken ?? null,
        },
      });
    }

    return this.prisma.connection.create({
      data: {
        userId,
        provider: 'google',
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? null,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.connection.findMany({
      where: { userId },
    });
  }
}