import { ReactElement } from 'react';
import UserActions from '../auth/components/UserActions';
import './Header.css';

type HeaderProps = {
  search?: ReactElement;
  actions?: ReactElement;
};

const Header: React.FC<HeaderProps> = ({ search, actions }) => {
  return (
    <header>
      {actions && <div className="actions">{actions}</div>}
      {search && <div className="search">{search}</div>}
      <div className="user">
        <UserActions />
      </div>
    </header>
  );
};

export default Header;
