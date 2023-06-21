import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
// import { LoggingService } from '../logging/logging.service';

/**
 * @description This is a service `provider`. This has a lifetime scope synchronized
 * with the application lifecycle.
 */
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  // constructor(private readonly LOG: LoggingService) {}

  create(cat: Cat) {
    // this.LOG.log('CatsService.create', cat);
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
