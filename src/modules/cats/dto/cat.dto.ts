import { IsString, IsInt, IsNumberString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}

export class UpdateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}

export class ListAllEntities {
  @IsInt()
  limit: number;
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}
