import { apiFetch } from '../../api';
import { Movie } from '../Movie';
import { MovieDetails } from '../MovieDetails';

const MovieApi = {
  loadAll: (): Promise<Movie[]> => {
    return apiFetch('/movie', {});
  },
  load: (id: number): Promise<MovieDetails> => {
    return apiFetch('/movie/' + id, {});
  },
};

export default MovieApi;
