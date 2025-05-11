import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Survey.css';

export default function Survey({ code, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers]   = useState([]);
  const [idx, setIdx]           = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      const snap = await getDoc(doc(db, 'surveys', code));
      if (!snap.exists()) {
        alert('Invalid code');
        return;
      }
      const data = snap.data();
      setQuestions(data.questions || []);
      setAnswers(Array((data.questions || []).length).fill(''));
    }
    fetchQuestions();
  }, [code]);

  const handleSubmit = async () => {
    await addDoc(collection(db, 'surveys', code, 'responses'), {
      answers,
      timestamp: new Date()
    });
    onComplete();
  };

  if (!questions.length) return <p className="survey-loading">Loading questions…</p>;

  return (
    <div className="survey-container">
      <p className="survey-question">{questions[idx]}</p>
      <textarea
        className="survey-textarea"
        value={answers[idx]}
        onChange={e => {
          const a = [...answers];
          a[idx] = e.target.value;
          setAnswers(a);
        }}
      />
      <div className="survey-nav">
        <button
          className="survey-btn survey-btn-prev"
          disabled={idx === 0}
          onClick={() => setIdx(i => i - 1)}
        >
          Previous
        </button>
        {idx < questions.length - 1 ? (
          <button
            className="survey-btn survey-btn-next"
            onClick={() => setIdx(i => i + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="survey-btn survey-btn-submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
