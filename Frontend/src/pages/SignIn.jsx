// SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './SignIn.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={e => { e.preventDefault(); handleSignIn(); }}>
        <h1 className="sign-in-title">Sign In</h1>

        <label className="sign-in-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="sign-in-input"
        />

        <label className="sign-in-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="sign-in-input"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </div>
);
}
