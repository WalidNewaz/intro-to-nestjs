import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../../modules/logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly LOG: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.LOG.log('Request...');
    next();
  }
}
