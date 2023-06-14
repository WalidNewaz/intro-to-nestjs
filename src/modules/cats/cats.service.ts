import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';

/**
 * @description This is a service `provider`. This has a lifetime scope synchronized
 * with the application lifecycle.
 */
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    console.log('CatsService.create', cat);
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
