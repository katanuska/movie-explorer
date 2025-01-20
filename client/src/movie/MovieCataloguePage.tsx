import { useCallback, useEffect, useState } from 'react';
import { Movie } from './Movie';
import MovieApiImpl from './MovieApi';
import Header from '../components/Header';
import Movies from './Movies';
import FavoriteApiImpl from './favorite/FavoriteApi';
import './MovieCataloguePage.css';

const MovieCataloguePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showFavorite, setShowFavorite] = useState(false);

  const getAllMovies = useCallback(async () => {
    const allMovies = await MovieApiImpl.loadAll();
    setMovies(allMovies);
  }, []);

  const getFavoriteMovies = useCallback(async () => {
    const favorites = await FavoriteApiImpl.loadFavorites();
    setMovies(favorites);
  }, []);

  useEffect(() => {
    if (showFavorite) {
      getFavoriteMovies();
    } else {
      getAllMovies();
    }
  }, [showFavorite, getAllMovies, getFavoriteMovies]);

  return (
    <>
      <Header
        onShowFavoriteToggle={() => setShowFavorite((favorites) => !favorites)}
        showFavorite={showFavorite}
      />
      <div className="page-content">
        <Movies movies={movies} favorite={showFavorite} />
      </div>
    </>
  );
};

export default MovieCataloguePage;
