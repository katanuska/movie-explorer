import { useCallback, useEffect, useState } from 'react';
import { Movie } from './model/Movie';
import FavoriteApi from './api/FavoriteApi';
import Header from '../components/Header';
import MovieCatalogue from './catalogue/MovieCatalogue';
import { Link } from 'react-router';

const FavoriteMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getFavoriteMovies = useCallback(async () => {
    const favorites = await FavoriteApi.loadFavorites();
    setMovies(favorites);
  }, []);

  useEffect(() => {
    getFavoriteMovies();
  }, [getFavoriteMovies]);

  return (
    <>
      <Header actions={<Link to="/">Show all movies</Link>} />
      {movies?.length > 0 ? (
        <MovieCatalogue movies={movies} defaultFavorite={true} />
      ) : (
        <div>You don't have favorite movies.</div>
      )}
    </>
  );
};

export default FavoriteMoviesPage;
