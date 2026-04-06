"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const connection_module_1 = require("./modules/connection/connection.module");
@(0, common_1.Module)({
    imports: [connection_module_1.ConnectionModule],
    controllers: [app_controller_1.AppController],
    providers: [app_service_1.AppService],
})
class AppModule {
}
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map