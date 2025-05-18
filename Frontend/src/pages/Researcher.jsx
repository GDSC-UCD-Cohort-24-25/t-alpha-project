import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

export default function Researcher() {
  const [loading, setLoading] = useState(true);
  const [user, setUser]       = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="h-screen">
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
      <div className="flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold">Researcher</h1>
      </div>
    </div>
  );
}
