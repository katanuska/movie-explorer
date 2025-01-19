import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AuthApiImpl from './AuthApi';
import { User } from './model/User';

interface UserContextType {
  user: User | null;
  signIn: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const CURRENT_USER_KEY = 'currentUser';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  //TODO: implement signout
  const loadCurrentUser = async () => {
    const currentUser = await AuthApiImpl.getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      // localStorage.removeItem(CURRENT_USER_KEY);
    }
  };

  const signIn = (user: User) => {
    setUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
