import { apiFetch } from '../../api';
import { Movie } from '../model/Movie';
import { MovieDetails } from '../model/MovieDetails';

const MovieApi = {
  loadAll: (): Promise<Movie[]> => {
    return apiFetch('/movie', {});
  },
  load: (id: number): Promise<MovieDetails> => {
    return apiFetch('/movie/' + id, {});
  },
};

export default MovieApi;
