import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto as CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto as UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly movieRepository: Repository<Favorite>,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: number) {
    // const user = await this.userService.findOne({ where: { id: userId } });

    return 'This action adds a new favourite';
  }

  findAll() {
    return `This action returns all favourites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favourite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`;
  }
}
