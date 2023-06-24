import { Controller, Get, Post, Body } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dtos/createActivity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async findAll() {
    const activities = await this.activitiesService.findAll();
    const activitiesDto = activities.map((activity) => {
      const { id, name, description, place } = activity;
      return {
        id,
        name,
        description,
        place,
      };
    });
    return activitiesDto;
  }

  @Post()
  create(@Body() body: CreateActivityDto) {
    return this.activitiesService.create(body);
  }
}
