import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  findAll() {
    return this.movieRepository.find({ take: 20 }); // TODO: Add pagination
  }

  findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }
}
