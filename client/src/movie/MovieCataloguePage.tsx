import { useCallback, useEffect, useState } from 'react';
import { Movie } from './Movie';
import MovieApiImpl from './MovieApi';
import Header from '../components/Header';
import Movies from './Movies';

const MovieCataloguePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getAllMovies = useCallback(async () => {
    const allMovies = await MovieApiImpl.loadAll();
    setMovies(allMovies);
  }, []);

  const getFavoriteMovies = useCallback(async () => {
    const favorites = await MovieApiImpl.loadFavorite();
    setMovies(favorites);
  }, []);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  return (
    <>
      <Header onShowFavorite={getFavoriteMovies} onShowAll={getAllMovies} />
      <div className="page-content">
        <Movies movies={movies} />
      </div>
    </>
  );
};

export default MovieCataloguePage;
