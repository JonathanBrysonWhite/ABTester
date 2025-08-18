'use client';

import React from 'react';

interface SnippetABProps {
  left: string;      // URL or path to left snippet
  right: string;     // URL or path to right snippet
  onSelect: (choice: 0 | 1) => void;
}

const SnippetAB: React.FC<SnippetABProps> = ({ left, right, onSelect }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl">
      {/* Left snippet */}
      <div
        className="flex-1 border border-gray-300 rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onSelect(0)}
      >
        <iframe
          src={left}
          title="Left Snippet"
          className="w-full h-64 md:h-96"
          frameBorder={0}
        />
      </div>

      {/* Right snippet */}
      <div
        className="flex-1 border border-gray-300 rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onSelect(1)}
      >
        <iframe
          src={right}
          title="Right Snippet"
          className="w-full h-64 md:h-96"
          frameBorder={0}
        />
      </div>
    </div>
  );
};

export default SnippetAB;
