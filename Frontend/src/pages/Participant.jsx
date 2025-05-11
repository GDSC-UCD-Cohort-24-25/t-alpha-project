import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Survey from '../components/Survey';

export default function Participant() {
  const [code, setCode] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [mediaURL, setMediaUrl] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const loadSurvey = async () => {
    const snap = await getDoc(doc(db, 'surveys', code));
    if (!snap.exists()) {
      alert('Invalid code');
      return;
    }
    const data = snap.data();
    setMediaUrl(data.mediaURL || '');
    setIsVideo(!!data.video);
    setLoaded(true);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <input
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          maxLength={4}
          placeholder="Enter code"
          className="border w-20 h-12 text-center text-white px-0 py-0 leading-[48px]"
        />
        <button
          onClick={loadSurvey}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Load Survey
        </button>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading survey...</p>
      </div>
    );
  }

  if (!completed) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Survey code={code} onComplete={() => setCompleted(true)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4">
      {isVideo ? (
        <iframe
          className="w-full max-w-md h-64"
          src={mediaURL}
          title="Survey Media"
          allowFullScreen
        />
      ) : (
        <img
          src={mediaURL}
          alt="Survey Media"
          className="w-full max-w-md h-64 object-cover"
        />
      )}
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Done
      </button>
    </div>
  );
}
