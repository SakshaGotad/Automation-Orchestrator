"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const connection_controller_1 = require("./connection.controller");
const connection_service_1 = require("./connection.service");
@(0, common_1.Module)({
    controllers: [connection_controller_1.ConnectionController],
    providers: [connection_service_1.ConnectionService],
})
class ConnectionModule {
}
exports.ConnectionModule = ConnectionModule;
//# sourceMappingURL=connection.module.js.map