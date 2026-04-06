import { prisma } from "@repo/database"

export class ConnectionService {
    async create(userId: string, app: string) {
        return prisma.connection.create({
            data: {
                userId,
                app,
                accessToken: "mock-token", // mocking OAuth
            },
        })

    }

    async findAll(userId: string) {
        return prisma.connection.findMany({
            where: { userId },
        });
    }
}