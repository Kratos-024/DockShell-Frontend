export const FeatureSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-6xl mx-auto">
        <div
          className="flex flex-col lg:border-r py-12 relative group/feature overflow-hidden lg:border-l
          dark:border-neutral-800 min-h-[280px]"
        >
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-green-100/50 dark:from-green-900/30 to-transparent pointer-events-none"></div>
          <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-terminal-2"
            >
              <path d="M8 9l3 3l-3 3"></path>
              <path d="M13 15l3 0"></path>
              <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
            </svg>
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center"></div>
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              Built for developers
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 flex-1">
            Built for engineers, developers, dreamers, thinkers and doers.
            Create amazing applications with our powerful tools.
          </p>
        </div>

        <div className="flex flex-col lg:border-r py-12 relative group/feature overflow-hidden  dark:border-neutral-800 min-h-[280px]">
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-green-100/50 dark:from-green-900/30 to-transparent pointer-events-none"></div>
          <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-ease-in-out"
            >
              <path d="M3 20c8 0 10 -16 18 -16"></path>
            </svg>
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center"></div>
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              Ease of use
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 flex-1">
            It's as easy as using an Apple, and as expensive as buying one.
            Simple, intuitive, and powerful.
          </p>
        </div>

        <div className="flex flex-col lg:border-r py-12 relative group/feature overflow-hidden  dark:border-neutral-800 min-h-[280px]">
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-green-100/50 dark:from-green-900/30 to-transparent pointer-events-none"></div>
          <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-currency-dollar"
            >
              <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
              <path d="M12 3v3m0 12v3"></path>
            </svg>
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center"></div>
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              Pricing like no other
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 flex-1">
            Our prices are best in the market. No cap, no lock, no credit card
            required. Transparent pricing for everyone.
          </p>
        </div>
      </div>
    </section>
  );
};
