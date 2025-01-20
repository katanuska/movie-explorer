import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieDetailsDto } from './dto/movie-details.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<MovieDto[]> {
    const movies = await this.movieRepository.find({ take: 20 }); // TODO: Add pagination

    return plainToInstance(MovieDto, movies);
  }

  async findOne(id: number): Promise<MovieDetailsDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors'],
    });

    if (!movie) throw new NotFoundException('Movie not found');

    console.log(movie);
    console.log(plainToInstance(MovieDetailsDto, movie));

    return plainToInstance(MovieDetailsDto, movie);
  }
}
