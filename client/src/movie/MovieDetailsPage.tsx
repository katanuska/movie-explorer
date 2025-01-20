import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MovieApi from './api/MovieApi';
import { MovieDetails } from './MovieDetails';

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  const { id } = useParams();

  const loadMovie = useCallback(async (id: string | undefined) => {
    if (!id || isNaN(+id)) throw new Error(`Invalid movie id ${id}.`);

    const movie = await MovieApi.load(+id);
    setMovie(movie);
  }, []);

  useEffect(() => {
    loadMovie(id);
  }, [id, loadMovie]);

  if (!movie) return null;

  return (
    <div>
      <div>Title: {movie.title}</div>
      <div>Genre: {movie.genre}</div>
      <div>Language: {movie.language}</div>
      <div>Rating: {movie.rating}</div>
      <div>Release year: {movie.releaseYear}</div>
      <div>Runtime: {movie.runtime}</div>
      <img src={movie.posterUrl} alt={movie.title} />
      <div>
        Cast:{' '}
        {movie.actors?.map((actor) => (
          <div>
            <div>Name: {actor.name}</div>
            <div>Character: {actor.character}</div>
            <img src={actor.imageUrl} alt={actor.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
