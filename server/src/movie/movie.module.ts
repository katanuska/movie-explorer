import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Actor } from './entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
