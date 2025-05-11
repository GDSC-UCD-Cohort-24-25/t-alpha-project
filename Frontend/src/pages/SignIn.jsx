import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';
import './SignIn.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/researcher', { replace: true });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/researcher', { replace: true });
    } catch {
      setError('Invalid username or password.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="sign-in-container">
      <form
        className="sign-in-form"
        onSubmit={e => {
          e.preventDefault();
          handleSignIn();
        }}
      >
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
