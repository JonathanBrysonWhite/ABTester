'use client';

import { useEffect, useState } from 'react';
import QuizClient from './QuizClient';
import { useParams } from 'next/navigation';

export default function QuizPage() {
  const { payload } = useParams();
  const [quizPayload, setQuizPayload] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayload = async () => {
      try {
        const res = await fetch('/api/decrypt-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setQuizPayload(data.quizPayload);
        }
      } catch (e) {
        setError('Failed to fetch quiz data');
      }
    };

    fetchPayload();
  }, [payload]);

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  if (!quizPayload) {
    return <div className="p-8 text-center">Loading quiz...</div>;
  }

  return <QuizClient quizPayload={quizPayload} />;
}
