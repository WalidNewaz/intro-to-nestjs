import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { CatsController } from '../../cats.controller';
import { CatsService } from '../../cats.service';
import { LoggingService } from '../../../logging/logging.service';
import { mockCatsService } from '../mocks/cats.service.mock';
import { mockLoggingService } from '../mocks/logging.service.mock';

const moduleMocker = new ModuleMocker(global);

const dependencyMocker = (token) => {
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

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker(dependencyMocker)
      .compile();
    controller = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const expected = [
        {
          name: 'test',
          age: 1,
          breed: 'test',
        },
      ];
      const result = await controller.findAll({ limit: 2 });
      expect(result).toEqual(expected);
    });
  });

  describe('getBreeds', () => {
    it('should return ["unknown"]', () => {
      const result = controller.getBreeds();
      expect(result).toEqual(['unknown']);
    });
  });
});
