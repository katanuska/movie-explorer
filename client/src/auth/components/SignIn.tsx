import React, { useState } from 'react';
import { LoginCredentials } from '../model/LoginCredentials';
import { useUser } from '../UserContext';
import AuthApiImpl from '../AuthApi';
import './Auth.css';

type SignInProps = {
  onSignUp: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

//TODO: move auth to separate page
const SignIn: React.FC<SignInProps> = ({ onSignUp, onSuccess, onError }) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  const { signIn } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const signedUser = await AuthApiImpl.signIn(formData);
      signIn(signedUser);
      onSuccess?.();
    } catch (error) {
      setError(true);
      onError?.();
    }
  };

  // TODO: Add eye icon for reveling password and use same component on signin and signup

  return (
    <div className="sign-in">
      <h2>Welcome to movie explorer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="on"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>
        New to Movie explorer?{' '}
        <button className="link" onClick={onSignUp}>
          Sign up
        </button>
        {error && <div>Error signing in.</div>}
      </div>
    </div>
  );
};

export default SignIn;
