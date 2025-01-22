import { useEffect, useState } from 'react';
import FavoriteApi from '../api/FavoriteApi';
import { useUser } from '../../auth/UserContext';
import './MarkFavorite.css';

type MarkFavoriteProps = {
  id: number;
  defaultFavorite: boolean;
};

const MarkFavorite: React.FC<React.PropsWithChildren<MarkFavoriteProps>> = ({
  id,
  defaultFavorite,
  children,
}) => {
  const { user } = useUser();

  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    setFavorite(defaultFavorite);
  }, [defaultFavorite]);

  const handleAddToFavorite = async () => {
    await FavoriteApi.addToFavorite(id);
    setFavorite(true);
  };

  const handleRemoveFromFavorite = async () => {
    await FavoriteApi.removeFromFavorite(id);
    setFavorite(false);
  };

  if (!user) {
    return children;
  }

  return (
    <div className="add-to-favorite-container">
      {!favorite ? (
        <button onClick={handleAddToFavorite}>Save</button>
      ) : (
        <button className="saved" onClick={handleRemoveFromFavorite}>
          <img src="/FavoritesFull.svg" alt="Favorite movie" />
        </button>
      )}
      {children}
    </div>
  );
};

export default MarkFavorite;
