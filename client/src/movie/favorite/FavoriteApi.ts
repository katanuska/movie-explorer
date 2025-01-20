import { apiFetch } from '../../api';
import { Movie } from '../Movie';

interface FavoriteApi {
  loadFavorites: () => Promise<Movie[]>;
  addToFavorite: (movieId: number) => Promise<void>;
  removeFromFavorite: (movieId: number) => Promise<void>;
}

const FavoriteApiImpl: FavoriteApi = {
  loadFavorites: async () => {
    const favorites = await apiFetch('/user/favorites', { method: 'GET' });
    return favorites as Movie[];
  },
  addToFavorite: (movieId: number): Promise<void> => {
    return apiFetch(`/user/favorites/${movieId}`, {
      method: 'POST',
    });
  },
  removeFromFavorite: (movieId: number): Promise<void> => {
    return apiFetch(`/user/favorites/${movieId}`, {
      method: 'DELETE',
    });
  },
};

export default FavoriteApiImpl;
