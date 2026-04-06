"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionController = void 0;
const common_1 = require("@nestjs/common");
@(0, common_1.Controller)("connections")
class ConnectionController {
    connectionService;
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    @(0, common_1.Post)()
    create(
    @(0, common_1.Body)()
    dto) {
        const userId = "user_1";
        return this.connectionService.create(userId, dto.app);
    }
    @(0, common_1.Get)()
    findAll() {
        const userId = "user_1";
        return this.connectionService.findAll(userId);
    }
}
exports.ConnectionController = ConnectionController;
//# sourceMappingURL=connection.controller.js.map