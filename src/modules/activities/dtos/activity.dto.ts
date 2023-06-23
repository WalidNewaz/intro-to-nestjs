import { IsString, IsDefined } from 'class-validator';
import { PlaceDto } from '../../places/dtos/place.dto';

export class ActivityDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsDefined()
  place: PlaceDto;
}
