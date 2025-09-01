import { useEffect, useState, type KeyboardEvent } from 'react';
import '@xterm/xterm/css/xterm.css';
import { toast } from 'react-toastify';
import { WebTerminal } from './XtremTerminal';
import { ChatProvider } from '../pages/AiChatPage';
import type { LevelData } from '../assets/types';
import LevelServiceInstance, { ApiError } from '../services/ctf.service';

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type Category = 'fileexploration' | 'crypto' | 'web' | 'binary' | 'forensics' | 'network';

interface CtfBodyProps {
  levelData?: LevelData | null;
  nextLevelNumber?: number;
}

const SkeletonLoader = ({ className }: { className?: string }) => (
  <div className={`bg-gray-700 animate-pulse rounded-md ${className}`} />
);

export const CtfBody = ({ levelData, nextLevelNumber }: CtfBodyProps) => {
  const [flagInput, setFlagInput] = useState('');
  const [submissionResult, setSubmissionResult] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState<LevelData['credentials'] | null>(null);

  useEffect(() => {
    if (levelData?.credentials) {
      setCredentials(levelData.credentials);
    }
    setFlagInput('');
    setSubmissionResult({ type: null, message: '' });
  }, [levelData]);

  const [showNote, setShowNote] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowNote(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!levelData) {
    return (
      <section className="px-4 py-5 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <SkeletonLoader className="h-10 w-1/2" />
          <div className="flex items-center gap-4">
            <SkeletonLoader className="h-6 w-24" />
            <SkeletonLoader className="h-6 w-24" />
          </div>
        </div>
        <SkeletonLoader className="mt-5 h-80 w-full" />
        <div className="py-3 mt-5">
          <div className="py-6">
            <SkeletonLoader className="h-8 w-1/4 mb-4" />
            <SkeletonLoader className="h-6 w-full mb-2" />
            <SkeletonLoader className="h-5 w-3/4" />
          </div>
          <SkeletonLoader className="h-40 w-full mt-4" />
        </div>
      </section>
    );
  }

  const levelNumber = levelData.uniqueId.split('-level')[1] || '0';
  const nextLevel = nextLevelNumber || parseInt(levelNumber) + 1;

  const handleFlagSubmit = async () => {
    if (!flagInput.trim()) {
      const errorMessage = 'Please enter a flag before submitting.';
      setSubmissionResult({ type: 'error', message: errorMessage });
      toast.error(errorMessage);
      return;
    }
    setIsSubmitting(true);
    try {
      await LevelServiceInstance.submitCtfFlag(
        levelData.ctfName,
        levelData.levelNo,
        flagInput.trim(),
      );
      const successMessage = `Correct! Flag accepted. Proceeding to Level ${nextLevel}`;
      setSubmissionResult({ type: 'success', message: successMessage });
      toast.success(successMessage);
      setFlagInput('');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof ApiError) {
        errorMessage = ` ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = ` ${error.message}`;
      }
      setSubmissionResult({ type: 'error', message: errorMessage });
      toast.error(errorMessage);
      console.error('Flag submission failed:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmissionResult({ type: null, message: '' });
      }, 5000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleFlagSubmit();
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFlagInput(text);
      toast.info('Text pasted from clipboard');
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      toast.error('Failed to read from clipboard.');
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400';
      case 'intermediate':
        return 'text-yellow-400';
      case 'advanced':
        return 'text-orange-400';
      case 'expert':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'fileexploration':
        return '📁';
      case 'crypto':
        return '🔐';
      case 'web':
        return '🌐';
      case 'binary':
        return '💾';
      case 'forensics':
        return '🔍';
      case 'network':
        return '🌐';
      default:
        return '📝';
    }
  };

  return (
    <section className="px-4 py-5 bg-black/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-4xl font-bold">
          {levelData.ctfName.charAt(0).toUpperCase() + levelData.ctfName.slice(1).toLowerCase()}{' '}
          Level {levelNumber}
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(levelData.difficulty)}`}
          >
            {levelData.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            {getCategoryIcon(levelData.category)} {levelData.category}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            ⏱️ ~{levelData.estimatedTime} min
          </span>
        </div>
      </div>

      {showNote && (
        <div className="mb-6 transition-opacity duration-500">
          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm shadow-sm">
            ⚠️ <span>Note: Use your own CLI if this terminal doesn’t work.</span>
          </div>
        </div>
      )}

      <div className="my-5">
        <WebTerminal />
      </div>

      <div className="py-3 mt-5">
        <div className="py-6">
          <p className="text-xl text-slate-500">Level Goal</p>
          <p className="text-lg">{levelData.goal}</p>
          <p className="text-base text-gray-600 mt-2">{levelData.description}</p>
        </div>

        {credentials && (
          <div className="text-white p-4 -xl">
            <p className="text-lg font-semibold">Credentials</p>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="font-bold">Host:</span> {credentials.host}
              </li>
              <li>
                <span className="font-bold">Port:</span> {credentials.Port}
              </li>
              <li>
                <span className="font-bold">Username:</span> {credentials.username}
              </li>
              <li>
                <span className="font-bold">Password:</span> {credentials.password}
              </li>
            </ul>
          </div>
        )}

        {+levelNumber === 0 && credentials && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Connect with SSH:</p>
            <pre className="bg-slate-800 text-green-400 p-3 rounded-lg mt-2 overflow-x-auto">
              ssh {credentials.username}@{credentials.host} -p {credentials.Port}
            </pre>
          </div>
        )}

        {levelData.commands && levelData.commands.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Useful Commands:</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {levelData.commands.map((command, index) => (
                <div key={index} className="p-1 rounded-lg">
                  <code>{command}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Submit Flag</h3>
            <span className="text-sm text-gray-400">
              Level {levelNumber} → Level {nextLevel}
            </span>
          </div>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter the password for the next level..."
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono text-sm"
              disabled={isSubmitting}
            />
            <button
              onClick={pasteFromClipboard}
              disabled={isSubmitting}
              className="px-4 py-3 bg-slate-400 hover:opacity-90 cursor-pointer disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
              title="Paste from clipboard"
            >
              <span className="hidden sm:inline">Paste</span>
            </button>
            <button
              onClick={handleFlagSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#bbff34] hover:bg-[#97d41b] cursor-pointer disabled:cursor-not-allowed text-black rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
          {submissionResult.type && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                submissionResult.type === 'success'
                  ? 'bg-green-900/50 border-2 border-green-500/70 text-green-300'
                  : 'bg-red-900/50 border-2 border-red-500/70 text-red-300'
              }`}
            >
              <div className="text-2xl">{submissionResult.type === 'success' ? '✅' : '❌'}</div>
              <div className="flex-1">
                <p className="font-medium">{submissionResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {levelData.hints && levelData.hints.length > 0 && (
          <div className="mt-6 text-slate-600">
            <p className="text-lg font-semibold">Hints:</p>
            <ul className="list-disc list-inside space-y-1">
              {levelData.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {levelData.links && levelData.links.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Helpful Resources:</p>
            <div className="mt-2 space-y-2">
              {levelData.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 underline"
                >
                  Resource {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-9">Note: If Terminal doesn't work, use either PC or Termux</div>
        <ChatProvider />
      </div>
    </section>
  );
};
