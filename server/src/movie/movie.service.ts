import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieDetailsDto } from './dto/movie-details.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(title?: string): Promise<MovieDto[]> {
    // TODO: Add pagination
    const movies = await this.movieRepository.find({
      where: title ? { title: ILike(`%${title}%`) } : {},
      take: 20,
    });
    // const movies = await this.movieRepository.find({ take: 20 });

    return plainToInstance(MovieDto, movies);
  }

  async findOne(id: number): Promise<MovieDetailsDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: { actors: true },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    return plainToInstance(MovieDetailsDto, movie);
  }
}
