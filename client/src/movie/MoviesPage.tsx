import { useEffect, useState } from 'react';
import { Movie } from './model/Movie';
import MovieApiImpl from './api/MovieApi';
import Header from '../components/Header';
import MovieCatalogue from './catalogue/MovieCatalogue';
import Protected from '../components/Protected';
import { Link } from 'react-router';
import { useDebounce } from 'use-debounce';

const MovieCataloguePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 300); // 300ms debounce

  useEffect(() => {
    const fetchMovies = async () => {
      const allMovies = await MovieApiImpl.loadAll(debouncedSearch);
      setMovies(allMovies);
    };

    fetchMovies();
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header
        search={
          <input
            placeholder="Search movies by title"
            value={search}
            onChange={handleSearchChange}
          ></input>
        }
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
