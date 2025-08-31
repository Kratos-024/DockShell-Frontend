import { useState } from 'react';
import type { levelPorgressResponse } from '../assets/types';

type Level = {
  ctfProgressId: string;
  id: string;
  levelNo: number;
  password: string;
};

export const CTFProgress = ({
  levelPorgressData,
}: {
  levelPorgressData: levelPorgressResponse[];
}) => {
  const [expandedCTF, setExpandedCTF] = useState<string | null>('Frostling');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const showPassword = (level: Level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl font-bold mb-2">CTF Progress</h2>
        <p className="text-gray-400">Click on completed levels to reveal passwords</p>
      </div>

      <div className="space-y-6">
        {/* Correctly map over the array directly. */}
        {/* Use a stable and unique key like ctf.id for the list items. */}
        {levelPorgressData.map((ctf) => (
          <div key={ctf.id} className="border border-gray-700 rounded-lg bg-gray-800/30">
            {/* CTF Header */}
            <div
              // Toggle expansion based on the ctfName
              onClick={() => setExpandedCTF(expandedCTF === ctf.ctfName ? null : ctf.ctfName)}
              className="p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{ctf.ctfName}</h3>
                {/* Optional: Add an indicator for expansion state */}
                <span className="text-gray-400 transform transition-transform">
                  {expandedCTF === ctf.ctfName ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Expandable Level Grid */}
            {/* Check for expansion based on ctfName */}
            {expandedCTF === ctf.ctfName && (
              <div className="p-4 border-t border-gray-700">
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 xl:grid-cols-20 gap-2">
                  {ctf.ctfClaimeds.map((level) => (
                    <div
                      key={level.levelNo}
                      className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-all cursor-pointer bg-green-500/20 text-green-300 hover:bg-green-500/40`}
                      onClick={() => showPassword(level)}
                      title={`Level ${level.levelNo} - Click to view password`}
                    >
                      {level.levelNo}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Password Modal (No changes needed here) */}
      {selectedLevel && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLevel(null)}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-4 border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-bold">
                Level {selectedLevel.levelNo} Password
              </h3>
              <button
                onClick={() => setSelectedLevel(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-900 p-4 rounded border border-green-500/30 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Password:</span>
                <button
                  onClick={() => navigator.clipboard.writeText(selectedLevel.password || '')}
                  className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
                >
                  📋 Copy
                </button>
              </div>
              <code className="text-green-400 font-mono text-sm break-all block">
                {selectedLevel.password}
              </code>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLevel(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(selectedLevel.password || '')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
              >
                Copy Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
