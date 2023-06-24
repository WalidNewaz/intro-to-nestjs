import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { Place } from '../places/entities/place.entity';
import { CreateActivityDto } from './dtos/createActivity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  /**
   * Create a new activity and add it to the place
   * @param activity
   * @returns the created activity
   */
  async create(activity: CreateActivityDto) {
    console.log('ActivitiesService.create', activity);
    const place = await this.placeRepository.findOneBy({
      id: activity.place.id,
    });
    if (!place) {
      throw new Error('Place not found');
    }
    console.log('place', place);
    const createdActivity = await this.activityRepository.save(activity);
    return createdActivity;
  }

  findAll() {
    return this.activityRepository.find({
      relations: {
        place: true,
      },
    });
  }
}
