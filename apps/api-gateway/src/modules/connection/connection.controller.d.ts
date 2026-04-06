import { ConnectionService } from "./connection.service";
import { CreateConnectionDto } from "./dto/create-connection.dto";
export declare class ConnectionController {
    private readonly connectionService;
    constructor(connectionService: ConnectionService);
    create(dto: CreateConnectionDto): Promise<any>;
    findAll(): Promise<any>;
}
//# sourceMappingURL=connection.controller.d.ts.map