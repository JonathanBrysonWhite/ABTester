'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  // Example default payload link (encrypted for your email)
  const defaultQuizLink = '/quiz/<your-encrypted-default-payload>';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl w-full text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-indigo-700">Discover Your Web Style</h1>
        <p className="mb-8 text-gray-700 text-lg">
          Take a short quiz to determine your design preferences for your next website!
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push('/generate-quiz')}
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-700 transition-colors"
          >
            Generate a Quiz
          </button>

          <button
            onClick={() => router.push(defaultQuizLink)}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded hover:bg-green-700 transition-colors"
          >
            Take Default Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
