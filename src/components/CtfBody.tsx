import { useState } from "react";
import "@xterm/xterm/css/xterm.css";
import { WebTerminal } from "./XtremTerminal";
import LevelServiceInstance from "../services/ctf.service";
import { useParams } from "react-router-dom";

type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
type Category =
  | "fileexploration"
  | "crypto"
  | "web"
  | "binary"
  | "forensics"
  | "network";

interface FileData {
  filename: string;
  content: string;
  permissions: string;
  hidden: boolean;
}

interface LevelData {
  uniqueId: string;
  goal: string;
  description: string;
  commands: string[];
  hints?: string[];
  links?: string[];
  files?: FileData[];
  expectedOutput?: string;
  difficulty: Difficulty;
  category: Category;
  estimatedTime: number;
  createdAt: Date;
}

interface CtfBodyProps {
  levelData: LevelData;
  // expectedFlag: string;
  nextLevelNumber?: number;
}

export const CtfBody = ({ levelData, nextLevelNumber }: CtfBodyProps) => {
  const [flagInput, setFlagInput] = useState("");
  const { ctfName } = useParams<string>();
  const [submissionResult, setSubmissionResult] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const levelNumber = levelData.uniqueId.split("-level")[1] || "0";
  const nextLevel = nextLevelNumber || parseInt(levelNumber) + 1;

  const username = `level${levelNumber}`;
  const password = `level${levelNumber}`;

  const handleFlagSubmit = async () => {
    if (!flagInput.trim()) {
      setSubmissionResult({
        type: "error",
        message: "Please enter a flag before submitting",
      });
      return;
    }
    console.log(levelNumber);
    const response = await LevelServiceInstance.saveCtfLevel(
      ctfName,
      +levelNumber,
      flagInput.trim()
    );
    console.log(response);
    // if (flagInput.trim() === expectedFlag) {
    //   setSubmissionResult({
    //     type: "success",
    //     message: "🎉 Correct! Flag accepted. Level completed!",
    //   });
    // } else {
    //   setSubmissionResult({
    //     type: "error",
    //     message: "❌ Incorrect flag. Try again!",
    //   });
    // }

    setTimeout(() => {
      setSubmissionResult({ type: null, message: "" });
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFlagSubmit();
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFlagInput(text);
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      setSubmissionResult({
        type: "error",
        message: "Failed to read from clipboard",
      });
    }
  };
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400";
      case "intermediate":
        return "text-yellow-400";
      case "advanced":
        return "text-orange-400";
      case "expert":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "fileexploration":
        return "📁";
      case "crypto":
        return "🔐";
      case "web":
        return "🌐";
      case "binary":
        return "💾";
      case "forensics":
        return "🔍";
      case "network":
        return "🌐";
      default:
        return "📝";
    }
  };

  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold">Frostling Level {levelNumber}</h2>
        <div className="flex items-center gap-4">
          <span
            className={`text-sm font-medium ${getDifficultyColor(
              levelData.difficulty
            )}`}
          >
            {levelData.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-gray-400">
            {getCategoryIcon(levelData.category)} {levelData.category}
          </span>
          <span className="text-sm text-gray-400">
            ⏱️ ~{levelData.estimatedTime} min
          </span>
        </div>
      </div>

      <div className="mt-5 bg-red-300">
        <WebTerminal />
      </div>

      <div className="py-3 mt-5">
        <div className="py-6">
          <p className="text-xl text-slate-500">🎯 Level Goal</p>
          <p className="text-lg">{levelData.goal}</p>
          <p className="text-base text-gray-600 mt-2">
            {levelData.description}
          </p>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md">
          <p className="text-lg font-semibold">🔑 Credentials</p>
          <ul className="mt-2 space-y-1">
            <li>
              <span className="font-bold">Host:</span>{" "}
              Frostling.labs.overthewire.org
            </li>
            <li>
              <span className="font-bold">Port:</span> 2220
            </li>
            <li>
              <span className="font-bold">Username:</span> {username}
            </li>
            <li>
              <span className="font-bold">Password:</span> {password}
            </li>
          </ul>
        </div>
        {+levelNumber === 0 && (
          <div className="mt-6">
            <p className="text-lg font-semibold">💻 Connect with SSH:</p>
            <pre className="bg-slate-800 text-green-400 p-3 rounded-lg mt-2 overflow-x-auto">
              ssh {username}@Frostling.labs.overthewire.org -p 2220
            </pre>
          </div>
        )}

        {levelData.commands && levelData.commands.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-semibold">🛠️ Useful Commands:</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {levelData.commands.map((command, index) => (
                <div
                  key={index}
                  className="bg-slate-800 text-green-400 p-3 rounded-lg"
                >
                  <code>{command}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {levelData.files && levelData.files.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-semibold">📄 Files Information:</p>
            <div className="space-y-3 mt-3">
              {levelData.files.map((file, index) => (
                <div
                  key={index}
                  className="bg-slate-100 border border-slate-300 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800">
                      {file.filename}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">
                        Permissions: {file.permissions}
                      </span>
                      {file.hidden && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>
                  <pre className="bg-slate-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                    {file.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flag Submission Section */}
        <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">🚩 Submit Flag</h3>
            <span className="text-sm text-gray-400">
              Level {levelNumber} → Level {nextLevel}
            </span>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter the password for next level..."
                className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono text-sm"
              />
            </div>
            <button
              onClick={pasteFromClipboard}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              title="Paste from clipboard"
            >
              📋
              <span className="hidden sm:inline">Paste</span>
            </button>
            <button
              onClick={handleFlagSubmit}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              🚀
              <span className="hidden sm:inline">Submit</span>
            </button>
          </div>

          {submissionResult.type && (
            <div
              className={`p-3 rounded-lg flex items-center gap-2 ${
                submissionResult.type === "success"
                  ? "bg-green-900/50 border border-green-500/50 text-green-400"
                  : "bg-red-900/50 border border-red-500/50 text-red-400"
              }`}
            >
              {submissionResult.message}
            </div>
          )}

          {levelData.expectedOutput && (
            <div className="mt-4 text-sm text-gray-400">
              <p>
                💡 <strong>Expected Output:</strong> {levelData.expectedOutput}
              </p>
            </div>
          )}
        </div>

        {levelData.hints && levelData.hints.length > 0 && (
          <div className="mt-6 text-slate-600">
            <p className="text-lg font-semibold">💡 Hints:</p>
            <ul className="list-disc list-inside space-y-1">
              {levelData.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {levelData.links && levelData.links.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-semibold">📚 Helpful Resources:</p>
            <div className="mt-2 space-y-2">
              {levelData.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 underline"
                >
                  📖 Resource {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
