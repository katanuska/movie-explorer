import React, { useState } from 'react';
import './Auth.css';
import { useUser } from '../UserContext';

type SignUpProps = {
  onSignIn: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

// TODO: Add forgot password
const SignUp: React.FC<SignUpProps> = ({ onSignIn, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  const { signUp } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // TODO: Add password complexity validation

    e.preventDefault();
    try {
      const { password, ...user } = formData;
      await signUp(user, password);
      onSuccess?.();
    } catch (e) {
      setError(true);
      onError?.();
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            minLength={4}
            type="text"
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
            minLength={8}
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        {error && <div>Error signing up.</div>}
      </form>
      <div>
        Have an account?{' '}
        <button className="link" onClick={onSignIn}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default SignUp;
