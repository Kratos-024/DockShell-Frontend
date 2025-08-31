import React from 'react';

export const StatsSection = () => {
  return (
    <div
      className="relative isolate overflow-hidden
      py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Build a Hacker's Mindset, Not Just a Skill Set{' '}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Go beyond theory. Our platform challenges your team to think critically, solve complex
            puzzles, and understand the "how" behind exploits in a hands-on, immersive terminal
            experience.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="whitespace-nowrap mb-2 hover:text-gray-300 transition-colors">
            See the Labs we cover{' '}
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a href="#" className="whitespace-nowrap hover:text-gray-300 transition-colors">
              Learn Linux Commands{' '}
              <span className="inline" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#" className="whitespace-nowrap hover:text-gray-300 transition-colors">
              Learning Networking tools like nmap
              <span className="inline" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#" className="whitespace-nowrap hover:text-gray-300 transition-colors">
              Cryptography{' '}
              <span className="inline" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">Users</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">100+</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">Labs</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">10+</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem]
         w-[64rem] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
        style={
          {
            mask: "radial-gradient(closest-side,white,transparent)",
          } as React.CSSProperties
        }
      >
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#7775D6" />
            <stop offset="1" stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg> */}
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
        style={
          {
            mask: 'radial-gradient(closest-side,white,transparent)',
          } as React.CSSProperties
        }
      >
        <circle cx="512" cy="512" r="512" fill="url(#hacker-gradient)" fillOpacity="0.3" />
        <defs>
          <radialGradient id="hacker-gradient">
            <stop stopColor="#00ff41" />
            <stop offset="0.3" stopColor="#00ff00" />
            <stop offset="0.7" stopColor="#00cc00" />
            <stop offset="1" stopColor="#004400" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
