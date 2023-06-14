import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './controllers/cats.controller';
import { AdminController } from './controllers/admin.controller';

import { CatsService } from './services/cats.service';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminController],
  providers: [AppService, CatsService],
})
export class AppModule {}
