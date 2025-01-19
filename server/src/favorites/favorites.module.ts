import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UserService } from 'src/user/user.service';
import { MovieService } from 'src/movie/movie.service';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Movie])],
  controllers: [FavoritesController],
  providers: [FavoritesService, UserService, MovieService, JwtService],
})
export class FavoritesModule {}
