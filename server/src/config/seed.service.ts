import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/movie/entities/actor.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const GENRE = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
const LANGUAGE = ['English', 'Spanish', 'French', 'German', 'Japanese'];

export const getMockMovie = (actors: Actor[]): Partial<Movie> => ({
  title: faker.lorem.words({ min: 1, max: 4 }),
  releaseYear: faker.date
    .past({ years: 30, refDate: new Date() })
    .getFullYear(), // Random year within the last 30 years
  genre: faker.helpers.arrayElement(GENRE),
  runtime: faker.number.int({ min: 80, max: 180 }),
  language: faker.helpers.arrayElement(LANGUAGE),
  posterUrl: faker.image.url({ width: 400, height: 225 }),
  rating: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
  actors: faker.helpers.arrayElements(actors, { min: 2, max: 10 }),
});

export const getMockActor = (): Partial<Actor> => ({
  name: faker.lorem.words(2),
  character: faker.lorem.words({ min: 1, max: 2 }),
  imageUrl: faker.image.url({ width: 225, height: 400 }),
});

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    private readonly userService: UserService,
  ) {}

  insertTestUser = async () => {
    const testUser = await this.userService.findOne('test-user');
    if (testUser === null) {
      this.userService.create('test-user', 'test');
    }
  };

  insertActors = async (total: number): Promise<Actor[]> => {
    const actors: Actor[] = [];

    for (let i = 0; i < total; i++) {
      const actor = this.actorRepository.create(getMockActor());
      actors.push(actor);
    }

    const savedActors = await this.actorRepository.save(actors);
    console.log(`Seeded ${total} actors successfully.`);
    return savedActors;
  };

  insertMovies = async (total: number, actors: Actor[]) => {
    const movies: Movie[] = [];

    for (let i = 0; i < total; i++) {
      const movie = this.movieRepository.create(getMockMovie(actors));
      movies.push(movie);
    }

    await this.movieRepository.save(movies);
    console.log(`Seeded ${total} movies successfully.`);
  };

  async run() {
    this.insertTestUser();
    const actors = await this.insertActors(30);
    this.insertMovies(30, actors);
  }
}
