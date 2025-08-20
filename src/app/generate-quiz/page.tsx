'use client';
import { useState } from 'react';
import { LuCopy } from "react-icons/lu";

const snippetPairs = [
    ['/density/dense.html', '/density/airy.html'],
    ['/column/single-column.html', '/column/multi-column.html'],
    ['/cta/bold-cta.html', '/cta/minimal-cta.html'],
    ['/copy/casual.html', '/copy/formal.html'],
    ['/media/hero-video.html', '/media/hero-image.html'],
    ['/illustration/flat.html', '/illustration/realistic.html'],
    ['/navigation/top-nav.html', '/navigation/side-nav.html'],
    ['/social/prominent.html', '/social/subtle.html'],
];


export default function GenerateQuizPage() {
    const [email, setEmail] = useState('');
    const [selectedPairs, setSelectedPairs] = useState<number[]>([]);
    const [generatedLink, setGeneratedLink] = useState('');

    const togglePair = (index: number) => {
        if (selectedPairs.includes(index)) {
            setSelectedPairs(selectedPairs.filter(i => i !== index));
        } else {
            setSelectedPairs([...selectedPairs, index]);
        }
    };

    const handleGenerate = async () => {
        if (!email.trim() || selectedPairs.length === 0) return;

        const snippets = selectedPairs.map(i => snippetPairs[i]);
        const encrypted = await fetch('/api/generate-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, snippets }),
        }).then(res => res.json()).then(data => data.quizLink);
        const link = `${window.location.origin}/quiz/${encodeURIComponent(encrypted)}`;
        setGeneratedLink(link);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Generate a Quiz</h1>

            <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Developer email to receive results"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <h2 className="text-xl font-semibold mt-4">Select snippet pairs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {snippetPairs.map((pair, index) => (
                        <label key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200">
                            <input
                                type="checkbox"
                                checked={selectedPairs.includes(index)}
                                onChange={() => togglePair(index)}
                            />
                            {pair[0]} vs {pair[1]}
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleGenerate}
                    className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                >
                    Generate Quiz Link
                </button>

                {generatedLink && (
                    <div>
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedLink)}
                            className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors"
                            >
                                                                <LuCopy className="inline mr-2" />
                                Copy Quiz Link

                            </button>
                        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded break-words">
                            <p className="font-semibold mb-2">Quiz Link:</p>
                            <a href={generatedLink} className="text-blue-700 underline" target="_blank" rel="noreferrer">{generatedLink}</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
