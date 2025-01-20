import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { FavoriteMovieDto } from './dto/favorite-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly movieService: MovieService,
  ) {}

  async findFavorites(username: string): Promise<FavoriteMovieDto[]> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      relations: ['favorites'],
    });
    if (!user) throw new UnauthorizedException();

    return user.favorites;
  }

  async addToFavorites(movieId: number, username: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      relations: ['favorites'],
    });
    if (!user) throw new UnauthorizedException();
    if (user.favorites.some((favorite) => favorite.id === movieId)) return;

    const movie = await this.movieService.findOne(movieId);
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
