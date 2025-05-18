import React, { useState, useEffect } from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  // 1️⃣ Auth-guard inside Dashboard
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (!u) navigate('/signin', { replace: true });
    });
    return unsub;
  }, [navigate]);

  // 2️⃣ Mock studies data
  const [studies, setStudies] = useState({ current: [], past: [] });
  useEffect(() => {
    setStudies({
      current: [
        { id: '1', title: 'Endurance Study',  date: '05/01/2025' },
        { id: '2', title: 'Memory Recall',   date: '05/03/2025' },
        { id: '3', title: 'Cognitive Load',   date: '05/05/2025' },
      ],
      past: [
        { id: '4', title: 'Sleep Patterns',   date: '04/20/2025' },
        { id: '5', title: 'Reaction Times',   date: '04/15/2025' },
      ],
    });
  }, []);

  // figure out which tab is active
  const tab = pathname.endsWith('/past') ? 'past' : 'current';

  // 3️⃣ Logout handler
  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin', { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      {/* ← Left sidebar */}
      <Sidebar />

      {/* → Main area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header: tabs + logout */}
        <div className="flex items-center justify-between border-b bg-white px-6 py-3">
          <nav className="flex space-x-4">
            <NavLink
              to="/researcher/current"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-blue-600 pb-1 text-blue-600'
                  : 'text-gray-600 pb-1'
              }
            >
              Current Studies
            </NavLink>
            <NavLink
              to="/researcher/past"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-blue-600 pb-1 text-blue-600'
                  : 'text-gray-600 pb-1'
              }
            >
              Past Studies
            </NavLink>
          </nav>

          <button
            onClick={handleSignOut}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Content: either Current or Past cards */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {studies[tab].map((s) => (
              <div
                key={s.id}
                onClick={() => navigate(`/researcher/study/${s.id}`)}
                className="
                  cursor-pointer
                  rounded-lg
                  border border-gray-300
                  bg-white p-4
                  shadow-sm hover:shadow-lg
                  transition-shadow duration-200
                "
              >
                <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
