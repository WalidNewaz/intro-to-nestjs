import { IsString, IsOptional } from 'class-validator';

export class PlaceDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
