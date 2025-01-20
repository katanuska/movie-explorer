import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { MovieModule } from 'src/movie/movie.module';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Module({
  imports: [MovieModule, TypeOrmModule.forFeature([User, Movie])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
