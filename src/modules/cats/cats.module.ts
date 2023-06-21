import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  onModuleInit() {
    console.log(`CatsModule has been initialized.`);
  }

  onApplicationBootstrap() {
    console.log(`CatsModule has been bootstrapped.`);
  }

  onModuleDestroy() {
    console.log(`CatsModule has been destroyed.`);
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(`CatsModule: beforeApplicationShutdown`);
  }

  onApplicationShutdown(signal?: string) {
    console.log(`CatsModule has been shutdown.`);
  }
}
