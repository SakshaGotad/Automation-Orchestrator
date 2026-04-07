import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TriggerDto {
  @IsString()
  app!: string;

  @IsString()
  event!: string;

  @IsObject()
  config!: any;

  @IsString()
  connectionId!: string;
}

class ActionDto {
  @IsNumber()
  step!: number;

  @IsString()
  app!: string;

  @IsString()
  event!: string;

  @IsObject()
  config!: any;

  @IsString()
  connectionId!: string;
}

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ValidateNested()
  @Type(() => TriggerDto)
  trigger!: TriggerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  actions!: ActionDto[];
  
}