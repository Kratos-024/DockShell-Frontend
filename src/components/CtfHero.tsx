import { useNavigate } from 'react-router-dom';
import TerminalTypewriter from './TerminalTypeWriter';

export const CtfHero = () => {
  const navigate = useNavigate();
  const navigationHandler = () => {
    navigate('/ctf/level0/frostling');
  };
  return (
    <section
      className="flex items-center px-4 mt-[96px]  relative 
    md:px-8 lg:px-16"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 max-lg:flex max-lg:flex-col-reverse lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-green-500">1642</span>{" "}
              <span className="text-white">virtual labs to hack better.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              A limitless pool of content, diverse in difficulty and techniques.
              Learn cybersecurity hands-on!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#bbff34] hover:opacity-90  text-black cursor-pointer px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Hacking
              </button>
              <button
                className="border cursor-pointer border-gray-600 hover:opacity-90
               hover:border-[#bbff34] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Labs
              </button>
            </div>
          </div> */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Hands-on </span>
              <span className="text-green-500">Cybersecurity Labs</span>
              <span className="text-white"> to Boost Your Skills</span>
            </h1>

            <div className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p className="mb-3">
                Start with <strong className="">2 exciting labs</strong>:
              </p>

              <div className="space-y-2 text-left text-sm">
                <div className=" items-start gap-2">
                  <div>
                    <span className="text-white font-semibold">Beginner:</span>
                    <span className="text-slate-600">
                      {' '}
                      Linux commands, networking & crypto basics.
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-white font-semibold">Advance:</span>
                  <span className="text-slate-600">
                    {' '}
                    Intermediate crypto & networking challenges.
                  </span>
                </div>{' '}
              </div>

              <div className="flex items-start gap-2">
                <div>
                  <span className="text-white font-semibold">Intermediate:</span>
                  <span className="text-slate-600"> Advanced cryptography & Linux.</span>
                </div>
              </div>

              <p className="mt-3 text-center lg:text-left text-sm">
                <span className="text-green-400 font-medium">More labs coming soon!</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={navigationHandler}
                className="bg-[#bbff34] hover:opacity-90 text-black cursor-pointer px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Lab
              </button>
              <button className="border cursor-pointer border-gray-600 hover:opacity-90 hover:border-[#bbff34] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Join the Community
              </button>
            </div>
          </div>
          <div
            className="w-full  mx-auto 
          lg:max-w-none"
          >
            <TerminalTypewriter />
          </div>
        </div>
      </div>
    </section>
  );
};
