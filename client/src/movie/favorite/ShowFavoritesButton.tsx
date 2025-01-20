import { useUser } from '../../auth/UserContext';

export type ShowFavoriteButtonProps = {
  onShowFavoriteToggle: () => void;
  showFavorite: boolean;
};

const ShowFavoriteButton: React.FC<ShowFavoriteButtonProps> = ({
  onShowFavoriteToggle,
  showFavorite,
}) => {
  const { user } = useUser();

  if (!user) return null;

  const buttonText = showFavorite ? 'All movies' : 'Favorite movies';

  return (
    <button className="light" onClick={() => onShowFavoriteToggle()}>
      {buttonText}
    </button>
  );
};

export default ShowFavoriteButton;
