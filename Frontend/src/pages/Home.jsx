import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">I am a:</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/signin')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Researcher
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Participant
        </button>
      </div>
    </div>
  );
}
