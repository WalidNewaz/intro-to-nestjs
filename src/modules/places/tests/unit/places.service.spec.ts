import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlacesService } from '../../places.service';
import { Place } from '../../entities/place.entity';
import { mockPlaceRepository } from '../mocks/place.repository.mock';

describe('PlacesService', () => {
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useValue: mockPlaceRepository,
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of places', async () => {
      const result = [
        {
          id: 1,
          name: 'Place 1',
        },
        {
          id: 2,
          name: 'Place 2',
        },
      ];
      expect(await service.findAll()).toEqual(result);
    });
  });
});
