"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConnectionDto = void 0;
const class_validator_1 = require("class-validator");
class CreateConnectionDto {
    @(0, class_validator_1.IsString)()
    app;
}
exports.CreateConnectionDto = CreateConnectionDto;
//# sourceMappingURL=create-connection.dto.js.map