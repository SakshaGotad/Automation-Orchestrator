import { IsString } from "class-validator";

export class CreateConnectionDto {
    @IsString()
    app!: string;
}