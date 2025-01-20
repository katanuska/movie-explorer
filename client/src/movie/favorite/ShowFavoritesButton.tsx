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

  // TODO: guard component through private component
  if (!user) return null;

  const buttonText = showFavorite ? 'All movies' : 'Favorite movies';

  return (
    <button className="light" onClick={() => onShowFavoriteToggle()}>
      {buttonText}
    </button>
  );
};

export default ShowFavoriteButton;
