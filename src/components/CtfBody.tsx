export const CtfBody = () => {
  return (
    <section className="px-4 py-5">
      <h2 className="text-4xl font-bold">Bandit Level 0</h2>
      <div className="py-6">
        <p className="text-xl text-slate-500">🎯 Level Goal</p>
        <p className="text-lg">
          The goal of this level is to log into the game using SSH. The host is
          running on a specific server, and you’ll use the given credentials to
          access it.
        </p>
      </div>

      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md">
        <p className="text-lg font-semibold">🔑 Credentials</p>
        <ul className="mt-2 space-y-1">
          <li>
            <span className="font-bold">Host:</span> bandit.labs.overthewire.org
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
      <div className="mt-6 text-slate-600">
        <p className="text-lg font-semibold">💡 Hint:</p>
        <p>
          Use a terminal on Linux/Mac, or use an SSH client like PuTTY on
          Windows. The password for Level 0 is <code>bandit0</code>.
        </p>
      </div>
    </section>
  );
};
