import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/auth.service';
import { FavoritesService } from './favorite.service';
import { MovieDto } from 'src/movie/dto/movie.dto';

@Controller('user/favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get('/')
  findFavorites(@CurrentUser() user: JwtPayload): Promise<MovieDto[]> {
    return this.favoriteService.findFavorites(user.username);
  }

  @Post('/:movieId')
  addToFavorite(
    @Param('movieId', ParseIntPipe) movieId: number,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    return this.favoriteService.addToFavorites(movieId, user.username);
  }

  @Delete(':movieId')
  removeFromFavorite(
    @Param('movieId', ParseIntPipe) movieId: number,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    return this.favoriteService.removeFromFavorites(movieId, user.username);
  }
}
