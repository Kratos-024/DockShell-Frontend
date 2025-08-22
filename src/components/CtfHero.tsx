import TerminalTypewriter from "./TerminalTypeWriter";

export const CtfHero = () => {
  return (
    <section className="h-[50vh] flex items-center px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-green-500">1642</span>{" "}
              <span className="text-white">virtual labs to hack better.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              A limitless pool of content, diverse in difficulty and techniques.
              Learn cybersecurity hands-on!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Hacking
              </button>
              <button className="border border-gray-600 hover:border-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View Labs
              </button>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:max-w-none">
            <TerminalTypewriter />
          </div>
        </div>
      </div>
    </section>
  );
};
