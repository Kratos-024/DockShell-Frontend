import React from 'react';
import { useParams } from 'react-router-dom';

export const Footer = () => {
  const { ctfLevel } = useParams();
  return (
    <footer>
      <div className=" w-full" style={{ '--radius': '0.5rem' } as React.CSSProperties}>
        <div
          className="preview flex  w-full
         justify-center pt-[96px]  items-center"
        >
          <div
            className={`border-t 
            px-8 py-20 
            ${ctfLevel ? 'bg-black/20' : 'dark:bg-[#35353537]'} w-full relative
             overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto text-sm text-neutral-500 justify-between items-start md:px-8">
              <div className="flex flex-col items-center justify-center w-full relative">
                <div className="mr-0 md:mr-4 md:flex mb-4">
                  <a
                    className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
                    href="/"
                  >
                    <img
                      alt="logo"
                      loading="lazy"
                      width="30"
                      height="30"
                      decoding="async"
                      className="object-contain "
                      src="https://secure.gravatar.com/avatar/0a36713aa63972a957a0eb366e8b0194.jpg?s=200&d=robohash&r=x"
                      style={{ color: 'transparent' }}
                    />
                    <span className="font-medium mt-2 text-black dark:text-white">DockShell</span>
                  </a>
                </div>

                <ul className="transition-colors flex sm:flex-row flex-col hover:text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none gap-4">
                  <li className="list-none">
                    <a className="transition-colors hover:text-neutral-800" href="#">
                      Users
                    </a>
                  </li>
                  <li className="list-none">
                    <a className="transition-colors hover:text-neutral-800" href="#">
                      Pricing
                    </a>
                  </li>
                  <li className="list-none">
                    <a className="transition-colors hover:text-neutral-800" href="#">
                      Blog
                    </a>
                  </li>
                  <li className="list-none">
                    <a className="transition-colors hover:text-neutral-800" href="#">
                      Privacy
                    </a>
                  </li>
                  <li className="list-none">
                    <a className="transition-colors hover:text-neutral-800" href="#">
                      Terms
                    </a>
                  </li>
                </ul>

                <div
                  className="w-[calc(100%+var(--offset))] h-[var(--height)] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] max-w-7xl mx-auto mt-8"
                  style={
                    {
                      '--background': '#ffffff',
                      '--color': 'rgba(0, 0, 0, 0.2)',
                      '--height': '1px',
                      '--width': '5px',
                      '--fade-stop': '90%',
                      '--offset': '200px',
                      '--color-dark': 'rgba(255, 255, 255, 0.2)',
                      backgroundSize: 'var(--width) var(--height)',
                      mask: 'linear-gradient(to_left,var(--background)_var(--fade-stop),transparent), linear-gradient(to_right,var(--background)_var(--fade-stop),transparent), linear-gradient(black,black)',
                      maskComposite: 'exclude',
                    } as React.CSSProperties
                  }
                ></div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between mt-8 items-center w-full">
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 sm:mb-0">© DockShell</p>

                <div className="flex gap-4">
                  <a href="https://x.com/P_Tiwari024" aria-label="Twitter">
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
                      className="h-6 w-6 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 transition-colors"
                    >
                      <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/priyanshu-tiwari-703867269/"
                    aria-label="LinkedIn"
                  >
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
                      className="h-6 w-6 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 transition-colors"
                    >
                      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                      <path d="M8 11l0 5"></path>
                      <path d="M8 8l0 .01"></path>
                      <path d="M12 16l0 -5"></path>
                      <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                    </svg>
                  </a>

                  <a href="https://github.com/Kratos-024" aria-label="GitHub">
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
                      className="h-6 w-6 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 transition-colors"
                    >
                      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
