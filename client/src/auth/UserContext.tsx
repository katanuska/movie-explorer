import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AuthApiImpl from './AuthApi';
import { User } from './model/User';
import { LoginCredentials } from './model/LoginCredentials';

interface UserContextType {
  user: User | null;
  signIn: (loginCredentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (user: User, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const CURRENT_USER_KEY = 'currentUser';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadCurrentUser = async () => {
    try {
      const currentUser = await AuthApiImpl.getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      setUser(null);
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const signUp = async (user: User, password: string) => {
    const createdUser = await AuthApiImpl.signUp(user, password);
    setUser(createdUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(createdUser));
  };

  const signIn = async (loginCredentials: LoginCredentials): Promise<void> => {
    const user = await AuthApiImpl.signIn(loginCredentials);
    setUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  };

  const signOut = async (): Promise<void> => {
    await AuthApiImpl.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, signUp }}>
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
