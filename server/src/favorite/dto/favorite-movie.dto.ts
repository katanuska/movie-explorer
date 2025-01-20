import { Expose } from 'class-transformer';

export class FavoriteMovieDto {
  @Expose()
  id: number;
}
