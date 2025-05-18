import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Home         from './pages/Home';
import Demo1        from './pages/Demo1';
import Demo2        from './pages/Demo2';
import SignIn       from './pages/SignIn';
import Dashboard    from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/"       element={<Home />} />
        <Route path="/demo1"  element={<Demo1 />} />
        <Route path="/demo2"  element={<Demo2 />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected dashboard (with its own Sidebar + tabs) */}
        <Route
          path="/researcher/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all → Sign In */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
