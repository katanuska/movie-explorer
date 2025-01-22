import { apiFetch } from '../api';
import { LoginCredentials } from './model/LoginCredentials';
import { User } from './model/User';

interface AuthApi {
  getCurrentUser: () => Promise<User>;
  signIn: (loginCredentials: LoginCredentials) => Promise<User>;
  signUp: (user: User, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthApiImpl: AuthApi = {
  getCurrentUser: async (): Promise<User> => {
    const currentUser = await apiFetch('/auth/user', {
      method: 'GET',
    });
    return currentUser as User;
  },
  signIn: async (loginCredentials: LoginCredentials): Promise<User> => {
    const signedInUser = await apiFetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(loginCredentials),
    });
    return signedInUser as User;
  },
  signUp: async (user: User, password: string): Promise<User> => {
    const signedUpUser = await apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ ...user, password }),
    });
    return signedUpUser as User;
  },
  signOut: async (): Promise<void> => {
    await apiFetch('/auth/signout', {
      method: 'POST',
    });
  },
};

export default AuthApiImpl;
