import React, { useState } from 'react';
import { apiFetch } from '../../api';
import './Auth.css';

type SignUpProps = {
  onSignIn: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onSignIn, onSuccess, onError }) => {
  // TODO: Add forgot password

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signUpResult, setSignUpResult] = useState<'success' | 'error' | null>(
    null,
  );

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
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSignUpResult('success');
      onSuccess?.();
    } catch (e) {
      setSignUpResult('error');
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
        {signUpResult === 'error' && <div>Error signing up.</div>}
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
