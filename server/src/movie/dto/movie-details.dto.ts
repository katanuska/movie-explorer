import { Expose, Type } from 'class-transformer';
import { ActorDto } from './actor.dto';

export class MovieDetailsDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  releaseYear: number;

  @Expose()
  genre: string;

  @Expose()
  runtime: number;

  @Expose()
  language: string;

  @Expose()
  posterUrl: string;

  @Expose()
  rating: number;

  @Expose()
  @Type(() => ActorDto)
  actors: ActorDto[];
}
