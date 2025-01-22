import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { plainToInstance } from 'class-transformer';
import { MovieDto } from 'src/movie/dto/movie.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findFavorites(username: string): Promise<MovieDto[]> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      relations: { favorites: true },
    });
    if (!user) throw new UnauthorizedException();

    return plainToInstance(MovieDto, user.favorites);
  }

  async addToFavorites(movieId: number, username: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      relations: { favorites: true },
    });
    if (!user) throw new UnauthorizedException();
    if (user.favorites.some((favorite) => favorite.id === movieId)) return;

    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException('Movie not found');

    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'favorites')
      .of(user)
      .add(movieId);
  }

  async removeFromFavorites(movieId: number, username: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      relations: ['favorites'],
    });
    if (!user) throw new UnauthorizedException();

    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'favorites')
      .of(user)
      .remove(movieId);
  }
}
