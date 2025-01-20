import { Module } from '@nestjs/common';
import { FavoritesController } from './favorite.controller';
import { FavoritesService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
