'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const defaultQuizLink = '/quiz/T%2B02aXovd%2BnlI8hqwufGoA%3D%3D%3AkwY67l4gUciqRKtRQVmHSU9vLUqBe6D%2FQCDtu8p%2BVREO5WhwSmFBNg1d7YbpejlEI7j%2BZZP772ApzUslJsS8XvtWLhLljOBqsCQkDvatHkS%2BFMdtfvglXAhEqC6lfu2Scf5TOR2s2L2ELEiSjnujOsPQ95mCQIZ711WXdWurLBrMNU5eZIO1P5JX4wDvUWt%2FUCEz7uZQ8ej8zmmrAa1Ex4byGP3BFsNq700mTLvKtHmHBiz8pptWF%2F0iXk85md5T19LzvEdToVBw4T5iYP6tfdfQkT9crb2KnjKeiz29wuXJ1vg7rNp2xSWzsqMkceN6VKlm7rnXs87G5ktNNqSQIrcniu98lK9tS%2BfFnmmmLn%2FMFTBg6%2FINAGXVnedjTxbTQMiimAl5vW6IYSjsrc9qvbMnun2%2FHEnMBOAgJNY63fkY%2FioBDGyiMrvsnvJDQRkPFa1SPMUacPu%2B4gG%2FErFHEFbfv6%2B3z4MVtjiICKH9UlDtfXAyMRE%2FHKQz683yGJ6LjjgszlAy9DA%2FL%2FCvaoSMddqmTnu1yPUKnnAINZWVFN7Ja%2Fmp8Sh4u%2FXmLzkOGbFQt0NmiPFU%2FHzwBGiMnBdE614YdAhw1CQtVu8GHGTBF3s3EeTnKiFouGR2aHYLUYpx';

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
