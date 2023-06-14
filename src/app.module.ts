import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoggingModule } from './modules/logging/logging.module';

@Module({
  imports: [CatsModule, AdminModule, LoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
