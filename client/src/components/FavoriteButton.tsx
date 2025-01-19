import { useState } from 'react';
import { useUser } from '../auth/UserContext';

export type FavoriteButtonProps = {
  onShowFavorite: () => void;
  onShowAll: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  onShowFavorite,
  onShowAll,
}) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const { user } = useUser();

  if (!user) return null;

  const handleClick = () => {
    const changedFavorite = !favorite;
    setFavorite(changedFavorite);
    if (changedFavorite) {
      onShowFavorite();
    } else onShowAll();
  };

  if (favorite) {
    return;
  }

  const buttonText = favorite ? 'All movies' : 'Favorite movies';

  return (
    <button className="light" onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default FavoriteButton;
