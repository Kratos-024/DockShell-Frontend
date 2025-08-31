import React from 'react';

export const FeatureSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-6xl mx-auto">
        {/* Feature 1: Realistic Environments */}
        <div className="flex flex-col lg:border-r py-12 relative group/feature overflow-hidden lg:border-l dark:border-neutral-800 min-h-[280px]">
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
              className="tabler-icon tabler-icon-box"
            >
              <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5"></path>
              <path d="M12 12l8 -4.5"></path>
              <path d="M12 12v9"></path>
              <path d="M12 12l-8 -4.5"></path>
            </svg>
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center"></div>
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              Realistic Sandbox
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 flex-1">
            Go beyond theory with fully interactive, containerized Linux environments. Your users
            learn by doing in a safe, isolated space that mirrors real-world systems.
          </p>
        </div>

        {/* Feature 2: Progressive Curriculum */}
        <div className="flex flex-col lg:border-r py-12 relative group/feature overflow-hidden dark:border-neutral-800 min-h-[280px]">
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
              className="tabler-icon tabler-icon-stairs-up"
            >
              <path d="M4 20h4v-4h4v-4h4v-4h4"></path>
              <path d="M4 11l7 -7v4m-4 -4h4"></path>
            </svg>
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center"></div>
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              Guided Learning Path
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 flex-1">
            Our levels are designed to build skills incrementally, from basic file commands to
            complex network analysis. Guide users from novice to pro with a structured, rewarding
            curriculum.
          </p>
        </div>

        {/* Feature 3: Real-World Skills */}
        <div className="flex flex-col lg:border-r py-12 relative group/feature overflow-hidden dark:border-neutral-800 min-h-[280px]">
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
              className="tabler-icon tabler-icon-shield-check"
            >
              <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
              <path d="M9 12l2 2l4 -4"></path>
            </svg>
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center"></div>
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              Practical Skills
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 flex-1">
            Teach the command-line tools that matter. From `grep` and `find` to `nmap` and `curl`,
            users gain practical experience with the tools used by security professionals every day.
          </p>
        </div>
      </div>
    </section>
  );
};
