import { apiFetch } from '../api';
import { Movie } from './Movie';

interface MovieApi {
  loadAll: () => Promise<Movie[]>;
  loadFavorite: () => Promise<Movie[]>;
}

const MovieApiImpl: MovieApi = {
  loadAll: () => {
    return apiFetch('/movie', {});
  },

  loadFavorite: () => {
    return apiFetch('/favorite', {});
  },
};

export default MovieApiImpl;
