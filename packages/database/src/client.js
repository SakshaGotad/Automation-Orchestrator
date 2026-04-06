"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const extension_1 = require("@prisma/client/extension");
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma ||
    new extension_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
//# sourceMappingURL=client.js.map