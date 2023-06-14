import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  log(...args: any[]) {
    console.log(args);
  }
}
