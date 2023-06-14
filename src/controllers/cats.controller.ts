import { Controller, Get } from '@nestjs/common';
import { CatsService } from '../services/cats.service';

@Controller('cats')
export class CatsController {
  service: CatsService = new CatsService();

  @Get()
  findAll(): Array<string> {
    return this.service.findAll();
  }

  @Get('breeds')
  getBreeds(): Array<string> {
    return this.service.getBreeds();
  }
}
