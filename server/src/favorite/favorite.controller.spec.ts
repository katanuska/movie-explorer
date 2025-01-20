import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorite.controller';
import { FavoritesService } from './favorite.service';

describe('FavouritesController', () => {
  let controller: FavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [FavoritesService],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
