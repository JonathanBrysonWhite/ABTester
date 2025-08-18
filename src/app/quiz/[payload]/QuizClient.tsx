'use client';

import { useState } from 'react';
import SnippetAB from '@/components/SnippetAB';

interface QuizPayload {
  email: string;          // Developer email
  snippets: string[][];   // Array of snippet pairs
  clientName?: string;
}

interface QuizClientProps {
  quizPayload: QuizPayload;
}

export default function QuizClient({ quizPayload }: QuizClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [clientName, setClientName] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleStart = () => {
    if (!clientName.trim()) return;
    setStarted(true);
  };

  const handleChoice = async (choice: 0 | 1) => {
    const newResponses = [...responses, choice];

    if (currentIndex + 1 < quizPayload.snippets.length) {
      setResponses(newResponses);
      setCurrentIndex(currentIndex + 1);
    } else {
      setResponses(newResponses);
      setStarted(false);
      setFinished(true);

      // Send results via server-side API
      try {
        await fetch('/api/send-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: quizPayload.email,
            clientName,
            responses: newResponses,
            snippetPairs: quizPayload.snippets,
          }),
        });
      } catch (e) {
        console.error('Error sending quiz results:', e);
      }
    }
  };

  // --- Landing Page ---
  if (!started && !finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">What's your web style?</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleStart}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Click to Begin
          </button>
        </div>
      </div>
    );
  }

  // --- Quiz Page ---
  if (started) {
    const [left, right] = quizPayload.snippets[currentIndex];
    return (
      <div className="p-4 flex flex-col items-center min-h-screen bg-gray-50">
        <h1 className="text-xl font-bold mb-4">Select the design you prefer</h1>
        <SnippetAB
          left={`/snippets/${left}`}
          right={`/snippets/${right}`}
          onSelect={handleChoice}
        />
        <p className="mt-4">{currentIndex + 1} / {quizPayload.snippets.length}</p>
      </div>
    );
  }

  // --- Thank-You Page ---
  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Thanks for sharing your thoughts!</h2>
          <p className="text-gray-700 mb-4">{quizPayload.email} will be in touch with you shortly.</p>
        </div>
      </div>
    );
  }

  return null;
}
