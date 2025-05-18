import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function PrivateRoute({ children }) {
  const [checking, setChecking] = React.useState(true);
  const [user, setUser]         = React.useState(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setChecking(false);
    });
    return unsub;
  }, []);

  if (checking) {
    // while we’re verifying the auth state
    return <div className="flex items-center justify-center h-screen">Loading…</div>;
  }
  if (!user) {
    // not signed in → redirect
    return <Navigate to="/signin" replace />;
  }
  // signed in → render wrapped component or child routes
  return children ?? <Outlet />;
}