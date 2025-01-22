import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/auth.service';
import { FavoritesService } from './favorite.service';
import { MovieDto } from 'src/movie/dto/movie.dto';
import { Response } from 'express';

@Controller('user/favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get('/')
  findFavorites(@CurrentUser() user: JwtPayload): Promise<MovieDto[]> {
    return this.favoriteService.findFavorites(user.username);
  }

  @Post('/:movieId')
  async addToFavorite(
    @Param('movieId', ParseIntPipe) movieId: number,
    @CurrentUser() user: JwtPayload,
    @Res() response: Response,
  ): Promise<void> {
    const favoriteAdded = await this.favoriteService.addToFavorites(
      movieId,
      user.username,
    );
    if (favoriteAdded) response.status(201).send();
    else
      response.status(200).json({ message: 'Movie is already in favorites' });
  }

  @Delete(':movieId')
  removeFromFavorite(
    @Param('movieId', ParseIntPipe) movieId: number,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    return this.favoriteService.removeFromFavorites(movieId, user.username);
  }
}
