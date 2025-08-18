'use client';

import React from 'react';

interface SnippetABProps {
  left: string;             // absolute/relative URL in /public
  right: string;
  onSelect: (choice: 0 | 1) => void;
  heightClass?: string;     // optional: override height (e.g., "h-[520px]")
}

const SnippetAB: React.FC<SnippetABProps> = ({ left, right, onSelect, heightClass = 'h-64 md:h-96' }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
      {/* LEFT */}
      <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="relative">
          {/* Keep iframe interactive (NO pointer-events: none) */}
          <iframe
            src={left}
            title="Left Snippet"
            className={`w-full ${heightClass}`}
            frameBorder={0}
          />
          {/* Optional: tiny open-in-new-tab helper in corner */}
          <a
            href={left}
            target="_blank"
            rel="noreferrer"
            className="absolute top-2 right-2 text-xs bg-white/90 border px-2 py-1 rounded hover:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            Open
          </a>
        </div>
        <button
          className="w-full py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          onClick={() => onSelect(0)}
        >
          Choose Left
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="relative">
          <iframe
            src={right}
            title="Right Snippet"
            className={`w-full ${heightClass}`}
            frameBorder={0}
          />
          <a
            href={right}
            target="_blank"
            rel="noreferrer"
            className="absolute top-2 right-2 text-xs bg-white/90 border px-2 py-1 rounded hover:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            Open
          </a>
        </div>
        <button
          className="w-full py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          onClick={() => onSelect(1)}
        >
          Choose Right
        </button>
      </div>
    </div>
  );
};

export default SnippetAB;
