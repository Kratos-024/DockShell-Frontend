import { useState } from "react";
import "@xterm/xterm/css/xterm.css";
import { WebTerminal } from "./XtremTerminal";

export const CtfBody = () => {
  const [flagInput, setFlagInput] = useState("");
  const [submissionResult, setSubmissionResult] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Expected flag for this level
  const expectedFlag = "NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL";

  const handleFlagSubmit = () => {
    if (!flagInput.trim()) {
      setSubmissionResult({
        type: "error",
        message: "Please enter a flag before submitting",
      });
      return;
    }

    // Check if the flag matches
    if (flagInput.trim() === expectedFlag) {
      setSubmissionResult({
        type: "success",
        message: "🎉 Correct! Flag accepted. Level completed!",
      });
      // You can add additional logic here like updating progress, unlocking next level, etc.
    } else {
      setSubmissionResult({
        type: "error",
        message: "❌ Incorrect flag. Try again!",
      });
    }

    // Clear the result after 3 seconds
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

  return (
    <section className="px-4 py-5">
      <h2 className="text-4xl font-bold">Bandit Level 0</h2>
      <div className="mt-5 bg-red-300">
        <WebTerminal />
      </div>

      <div className="py-3 mt-5">
        <div className="py-6">
          <p className="text-xl text-slate-500">🎯 Level Goal</p>
          <p className="text-lg">
            The goal of this level is to log into the game using SSH. The host
            is running on a specific server, and you'll use the given
            credentials to access it.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md">
          <p className="text-lg font-semibold">🔑 Credentials</p>
          <ul className="mt-2 space-y-1">
            <li>
              <span className="font-bold">Host:</span>{" "}
              bandit.labs.overthewire.org
            </li>
            <li>
              <span className="font-bold">Port:</span> 2220
            </li>
            <li>
              <span className="font-bold">Username:</span> bandit0
            </li>
            <li>
              <span className="font-bold">Password:</span> bandit0
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">💻 Connect with SSH:</p>
          <pre className="bg-slate-800 text-green-400 p-3 rounded-lg mt-2 overflow-x-auto">
            ssh bandit0@bandit.labs.overthewire.org -p 2220
          </pre>
        </div>

        {/* Flag Submission Section */}
        <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">🚩 Submit Flag</h3>
            <span className="text-sm text-gray-400">Level 0 → Level 1</span>
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

          {/* Submission Result */}
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

          <div className="mt-4 text-sm text-gray-400">
            <p>
              💡 <strong>Tip:</strong> Find the password by reading the readme
              file in the home directory
            </p>
          </div>
        </div>

        <div className="mt-6 text-slate-600">
          <p className="text-lg font-semibold">💡 Hint:</p>
          <p>
            Use a terminal on Linux/Mac, or use an SSH client like PuTTY on
            Windows. The password for Level 0 is <code>bandit0</code>.
          </p>
        </div>
      </div>
    </section>
  );
};
