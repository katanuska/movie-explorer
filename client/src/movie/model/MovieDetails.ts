import { Movie } from './Movie';

export interface MovieDetails extends Movie {
  releaseYear: number;

  runtime: number;

  language: string;

  rating: number;

  actors: {
    id: number;
    name: string;
    imageUrl: string;
    character: string;
  }[];
}
