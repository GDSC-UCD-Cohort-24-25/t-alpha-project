import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Survey.css';

export default function Survey({ code, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers]     = useState([]);
  const [idx, setIdx]             = useState(0);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'surveys', code));
      if (!snap.exists()) {
        alert('Invalid code');
        return;
      }
      const data = snap.data();
      const qs = data.questions || [];
      setQuestions(qs);
      setAnswers(Array(qs.length).fill(''));
    })();
  }, [code]);

  const handleSubmit = async () => {
    const respDoc = await addDoc(
      collection(db, 'surveys', code, 'responses'),
      { answers, timestamp: new Date() }
    );
    onComplete(respDoc.id);
  };

  if (!questions.length) {
    return <p className="survey-loading">Loading questions…</p>;
  }

  return (
    <div className="survey-container">
      <p className="survey-question">{questions[idx]}</p>
      <textarea
        className="survey-textarea"
        value={answers[idx]}
        onChange={e => {
          const copy = [...answers];
          copy[idx] = e.target.value;
          setAnswers(copy);
        }}
      />
      <div className="survey-nav">
        <button
          className="survey-btn survey-btn-prev"
          disabled={idx === 0}
          onClick={() => setIdx(i => i - 1)}
        >Previous</button>
        {idx < questions.length - 1 ? (
          <button
            className="survey-btn survey-btn-next"
            onClick={() => setIdx(i => i + 1)}
          >Next</button>
        ) : (
          <button
            className="survey-btn survey-btn-submit"
            onClick={handleSubmit}
          >Submit</button>
        )}
      </div>
    </div>
  );
}
