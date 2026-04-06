"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionService = void 0;
const database_1 = require("@repo/database");
class ConnectionService {
    async create(userId, app) {
        return database_1.prisma.connection.create({
            data: {
                userId,
                app,
                accessToken: "mock-token", // mocking OAuth
            },
        });
    }
    async findAll(userId) {
        return database_1.prisma.connection.findMany({
            where: { userId },
        });
    }
}
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map