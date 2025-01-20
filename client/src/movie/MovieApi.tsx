import { apiFetch } from '../api';
import { Movie } from './Movie';

interface MovieApi {
  loadAll: () => Promise<Movie[]>;
}

const MovieApiImpl: MovieApi = {
  loadAll: () => {
    return apiFetch('/movie', {});
  },
};

export default MovieApiImpl;
