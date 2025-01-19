import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const GENRE = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
const LANGUAGE = ['English', 'Spanish', 'French', 'German', 'Japanese'];

export const getMockMovie = () => ({
  title: faker.lorem.words({ min: 1, max: 4 }),
  releaseYear: faker.date
    .past({ years: 30, refDate: new Date() })
    .getFullYear(), // Random year within the last 30 years
  genre: faker.helpers.arrayElement(GENRE),
  runtime: faker.number.int({ min: 80, max: 180 }),
  language: faker.helpers.arrayElement(LANGUAGE),
  posterUrl: faker.image.url({ width: 300, height: 169 }),
  rating: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
});

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly userService: UserService,
  ) {}

  insertTestUser = async () => {
    const testUser = await this.userService.findOne('test-user');
    if (testUser === null) {
      this.userService.create('test-user', 'test');
    }
  };

  insertMovies = async (total: number) => {
    const movies: Movie[] = [];

    for (let i = 0; i < total; i++) {
      const movie = this.movieRepository.create(getMockMovie());
      movies.push(movie);
    }

    await this.movieRepository.save(movies);
    console.log(`Seeded ${total} movies successfully.`);
  };

  async run() {
    this.insertTestUser();
    this.insertMovies(30);
  }
}
