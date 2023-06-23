import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dtos/createPlace.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  findAll(): Promise<Place[]> {
    return this.placesService.findAll();
  }

  @Post()
  create(@Body() place: CreatePlaceDto) {
    return this.placesService.create(place);
  }
}
