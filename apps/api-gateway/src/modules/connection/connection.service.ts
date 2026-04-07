import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Generic create
  async create(userId: string, provider: string) {
    return this.prisma.client.connection.create({
      data: {
        userId,
        provider,
        accessToken: '',
      },
    });
  }

  // ✅ PRODUCTION WAY → UPSERT (atomic)
  async upsertConnection(
    userId: string,
    provider: string,
    data: { accessToken: string; refreshToken?: string },
  ) {
    const existing = await this.prisma.client.connection.findFirst({
      where: { userId, provider },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) {
      return this.prisma.client.connection.update({
        where: { id: existing.id },
        data: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken ?? null,
        },
      });
    }

    return this.prisma.client.connection.create({
      data: {
        userId,
        provider,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? null,
      },
    });
  }

  async upsertGoogleConnection(
    userId: string,
    data: { accessToken: string; refreshToken?: string },
  ) {
    return this.upsertConnection(userId, 'google', data);
  }

  // ✅ Fetch all user connections
  async findAll(userId: string) {
    return this.prisma.client.connection.findMany({
      where: { userId },
    });
  }
}