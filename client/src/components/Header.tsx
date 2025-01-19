import UserActions from '../auth/components/UserActions';
import FavoriteButton, { FavoriteButtonProps } from './FavoriteButton';

type HeaderProps = FavoriteButtonProps;

const Header: React.FC<HeaderProps> = (favoriteButtonProps) => {
  return (
    <header>
      <div className="header-content">
        <FavoriteButton {...favoriteButtonProps} />
        <UserActions />
      </div>
    </header>
  );
};

export default Header;
