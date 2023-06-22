import * as request from 'supertest';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { CatsModule } from '../src/modules/cats/cats.module';
import { CatsService } from '../src/modules/cats/cats.service';
import { INestApplication } from '@nestjs/common';
import { LoggingService } from '../src/modules/logging/logging.service';
import { mockCatsService } from '../src/modules/cats/tests/mocks/cats.service.mock';
import { mockLoggingService } from '../src/modules/cats/tests/mocks/logging.service.mock';
import { TransformInterceptor } from '../src/shared/interceptors/transform.interceptor';

const moduleMocker = new ModuleMocker(global);

const dependencyMocker = (token) => {
  console.log('token', token);
  if (token === CatsService) {
    return mockCatsService;
  }
  if (token === LoggingService) {
    return mockLoggingService;
  }
  if (typeof token === 'function') {
    const mockMetadata = moduleMocker.getMetadata(
      token,
    ) as MockFunctionMetadata<any, any>;
    const Mock = moduleMocker.generateFromMetadata(mockMetadata);
    return new Mock();
  }
};

describe('Cats (e2e)', () => {
  let app: INestApplication;
  const catsService = {
    findAll: () => ['test'],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: TransformInterceptor,
        },
      ],
    })
      .useMocker(dependencyMocker)
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, async () => {
    return request(app.getHttpServer())
      .get('/cats?limit=2')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
