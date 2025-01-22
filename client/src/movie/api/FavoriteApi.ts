import { apiFetch } from '../../api';
import { Movie } from '../model/Movie';

const FavoriteApi = {
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

export default FavoriteApi;
