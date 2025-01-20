import { useCallback, useEffect, useState } from 'react';
import { Movie } from './Movie';
import MovieApiImpl from './api/MovieApi';
import FavoriteApiImpl from './favorite/FavoriteApi';
import Header from '../components/Header';
import Movies from './catalogue/MovieCatalogue';
import './MoviesPage.css';

//TODO: add search by title and genre
//TODO: move favorites to separate private page
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
