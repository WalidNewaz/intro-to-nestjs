import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dtos/createPlace.dto';

@Injectable()
export class PlacesService {
  private readonly places: Place[] = [];

  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  create(place: CreatePlaceDto) {
    console.log('PlacesService.create', place);
    return this.placeRepository.save(place);
  }

  findAll(): Promise<Place[]> {
    return this.placeRepository.find();
  }
}
