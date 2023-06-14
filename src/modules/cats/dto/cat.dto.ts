import { IsString, IsInt, IsNumberString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}

export class UpdateCatDto extends PartialType(CreateCatDto) {}

export class ListAllEntities {
  @IsInt()
  limit: number;
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}
