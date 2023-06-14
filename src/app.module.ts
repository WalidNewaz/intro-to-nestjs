import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [CatsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
