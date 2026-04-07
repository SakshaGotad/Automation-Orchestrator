import { IsString } from 'class-validator';

export class CreateConnectionDto {
  @IsString()
  provider!: string;
}