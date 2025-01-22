import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import MovieApi from './api/MovieApi';
import { MovieDetails } from './model/MovieDetails';
import Header from '../components/Header';
import './MovieDetailsPage.css';

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
    <>
      <Header actions={<Link to="/">Show all movies</Link>} />
      <div className="movie-details">
        <div>
          <img src={movie.posterUrl} alt={movie.title} />
        </div>
        <div>
          <h1>{movie.title}</h1>
          <p>Genre: {movie.genre}</p>
          <p>Language: {movie.language}</p>
          <p>Rating: {movie.rating}</p>
          <p>Release year: {movie.releaseYear}</p>
          <p>Runtime: {movie.runtime}</p>
        </div>
      </div>
      <h2>Cast:</h2>
      <div className="actors">
        {movie.actors?.map((actor) => (
          <div key={actor.id} className="actor-card">
            <img src={actor.imageUrl} alt={actor.name} />
            <div>Character: {actor.character}</div>

            <div>
              <b>{actor.name}</b>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieDetailsPage;
