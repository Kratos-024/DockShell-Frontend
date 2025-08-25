import { useState } from "react";

type Level = {
  level: number;
  solved: boolean;
  password: string | null;
};

type CTFGroup = {
  name: string;
  totalLevels: number;
  completedLevels: number;
  levels: Level[];
};

export const CTFProgress = () => {
  const [expandedCTF, setExpandedCTF] = useState<string | null>("bandit");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  // Generate levels function to avoid repetition
  const generateLevels = (
    total: number,
    completed: number,
    passwords: string[]
  ) => {
    return Array.from({ length: total }, (_, i) => ({
      level: i,
      solved: i < completed,
      password:
        i < completed ? passwords[i] || `flag{level_${i}_password}` : null,
    }));
  };

  const ctfGroups: Record<string, CTFGroup> = {
    bandit: {
      name: "OverTheWire: Bandit",
      totalLevels: 34,
      completedLevels: 15,
      levels: generateLevels(34, 15, [
        "bandit0",
        "NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL",
        "rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi",
        "aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG",
        "2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe",
        "lrIWWI6bB37kxfiCQchtPiR5XOAm7kQO",
        "koReBOKuIDDepwhWk7jZC0RTdopnAYKh",
        "HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs",
        "UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR",
        "IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR",
        "5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu",
        "dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc",
        "6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM",
        "JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv",
        "jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt",
      ]),
    },
    natas: {
      name: "OverTheWire: Natas",
      totalLevels: 34,
      completedLevels: 8,
      levels: generateLevels(34, 8, [
        "natas0",
        "gtVrDuiDfck831PqWsLEZy5gyDz1clto",
        "sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14",
        "Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ",
        "4wcYUJFw0k0XLSIgCW6q7LgTyeqlEJn5",
        "iX6IOfmpN7AYlWQyRZzBDXQ5Qa4LLYy6",
        "aGoY4q2kG7t4gTLsYqXhznNOz5WZtNzU",
        "7z3hqJGnNw4SBLQl0XqHqgCZMEoINE1N",
      ]),
    },
    krypton: {
      name: "OverTheWire: Krypton",
      totalLevels: 7,
      completedLevels: 4,
      levels: generateLevels(7, 4, [
        "WELCOME",
        "LEVEL1PASSWORDISTHIS",
        "CAESARCIPHERSHIFT3",
        "SUBSTITUTIONCIPHER",
      ]),
    },
    picoctf: {
      name: "PicoCTF 2024",
      totalLevels: 20,
      completedLevels: 12,
      levels: generateLevels(20, 12, [
        "picoCTF{welcome_to_cybersec}",
        "picoCTF{basic_buffer_overflow}",
        "picoCTF{sql_injection_found}",
        "picoCTF{xss_vulnerability_detected}",
        "picoCTF{file_inclusion_exploit}",
        "picoCTF{directory_traversal_success}",
        "picoCTF{command_injection_works}",
        "picoCTF{reverse_engineering_done}",
        "picoCTF{binary_exploitation_complete}",
        "picoCTF{crypto_challenge_solved}",
        "picoCTF{steganography_hidden_message}",
        "picoCTF{forensics_evidence_found}",
      ]),
    },
  };

  const showPassword = (level: Level) => {
    if (level.solved && level.password) {
      setSelectedLevel(level);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl font-bold mb-2">CTF Progress</h2>
        <p className="text-gray-400">
          Click on completed levels to reveal passwords
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(ctfGroups).map(([key, ctf]) => (
          <div
            key={key}
            className="border border-gray-700 rounded-lg bg-gray-800/30"
          >
            {/* CTF Header */}
            <div
              onClick={() => setExpandedCTF(expandedCTF === key ? null : key)}
              className="p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{ctf.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 font-medium">
                    {ctf.completedLevels}/{ctf.totalLevels}
                  </span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (ctf.completedLevels / ctf.totalLevels) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-gray-400 text-xl font-mono">
                    {expandedCTF === key ? "−" : "+"}
                  </span>
                </div>
              </div>
            </div>

            {/* Expandable Level Grid */}
            {expandedCTF === key && (
              <div className="p-4 border-t border-gray-700">
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 xl:grid-cols-20 gap-2">
                  {ctf.levels.map((level) => (
                    <div
                      key={level.level}
                      className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${
                        level.solved
                          ? "bg-green-600 text-white hover:bg-green-500 hover:scale-105 shadow-lg"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      }`}
                      onClick={() => showPassword(level)}
                      title={
                        level.solved
                          ? `Level ${level.level} - Click to view password`
                          : `Level ${level.level} - Not completed`
                      }
                    >
                      {level.level}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Password Modal */}
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
                Level {selectedLevel.level} Password
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
                  onClick={() =>
                    navigator.clipboard.writeText(selectedLevel.password || "")
                  }
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
                onClick={() =>
                  navigator.clipboard.writeText(selectedLevel.password || "")
                }
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
