import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../../cats.service';
import { LoggingService } from '../../../logging/logging.service';

const mockLoggingService = {
  log: jest.fn(),
};

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: LoggingService,
          useValue: mockLoggingService,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
