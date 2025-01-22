import { useCallback, useEffect, useState } from 'react';
import { Movie } from './model/Movie';
import MovieApiImpl from './api/MovieApi';
import Header from '../components/Header';
import MovieCatalogue from './catalogue/MovieCatalogue';
import Protected from '../components/Protected';
import { Link } from 'react-router';

//TODO: add search by title and genre
const MovieCataloguePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getAllMovies = useCallback(async () => {
    const allMovies = await MovieApiImpl.loadAll();
    setMovies(allMovies);
  }, []);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  return (
    <>
      <Header
        search={<input placeholder="Search movies by title"></input>}
        actions={
          <Protected>
            <Link to="/favorites">Show favorite</Link>
          </Protected>
        }
      />
      <MovieCatalogue movies={movies} defaultFavorite={false} />
    </>
  );
};

export default MovieCataloguePage;
