import { apiFetch } from '../../api';
import { Movie } from '../model/Movie';
import { MovieDetails } from '../model/MovieDetails';

const MovieApi = {
  loadAll: (search?: string): Promise<Movie[]> => {
    let url = '/movie';
    if (search) {
      url += `?title=${search}`;
    }
    return apiFetch(url, {});
  },
  load: (id: number): Promise<MovieDetails> => {
    return apiFetch('/movie/' + id, {});
  },
};

export default MovieApi;
