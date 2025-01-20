import { Expose } from 'class-transformer';

export class MovieDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  genre: string;

  @Expose()
  posterUrl: string;
}
