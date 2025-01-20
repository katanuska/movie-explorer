import UserActions from '../auth/components/UserActions';
import ShowFavoriteButton, {
  ShowFavoriteButtonProps,
} from '../movie/favorite/ShowFavoritesButton';
import './Header.css';

type HeaderProps = ShowFavoriteButtonProps;

const Header: React.FC<HeaderProps> = (favoriteButtonProps) => {
  return (
    <header>
      <div className="header-content">
        <ShowFavoriteButton {...favoriteButtonProps} />
        <UserActions />
      </div>
    </header>
  );
};

export default Header;
