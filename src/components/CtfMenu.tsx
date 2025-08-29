import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

export const CtfMenu = ({
  totalLevels,
  menuHandler,
  menu,
}: {
  totalLevels: number | null;
  menu: boolean;
  menuHandler: () => void;
}) => {
  const [unlockedLevels] = useState(5);
  const { ctfName } = useParams();
  const navigate = useNavigate();
  const handleLevelClick = (level: number) => {
    navigate(`/ctf/level${level}/${ctfName}`);
    window.location.reload();
  };

  const menuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  // const levelVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: { opacity: 1, scale: 1 },
  // };
  if (!totalLevels || !ctfName) {
    return;
  }
  const levels = Array.from({ length: totalLevels }, (_, i) => i);

  return (
    <>
      <motion.section
        variants={menuVariants}
        initial="hidden"
        animate={menu ? 'visible' : 'hidden'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bg-black/20 backdrop-blur-sm top-0 left-0 h-screen z-50
          w-[240px] sm:w-[260px] md:w-[280px]
          shadow-2xl border-r border-gray-700"
      >
        <div className="w-[1px] bg-slate-700 right-0 absolute h-screen" />

        <div className="w-full relative  h-full overflow-y-auto p-3 sm:p-4 md:p-6 pt-4 sm:pt-6 md:pt-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center font-semibold mb-6 sm:mb-8 md:mb-10
              text-xl sm:text-2xl md:text-[28px]"
          >
            <a href="/">{ctfName.charAt(0).toUpperCase() + ctfName.slice(1).toLowerCase()}</a>
          </motion.h2>

          <div className=" cursor-pointer absolute right-5 top-5" onClick={menuHandler}>
            <IoMdClose className="w-[28px] h-[28px] rotate-180 text-white" />
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-6 text-gray-500 w-full">
            <div className="w-full max-w-[180px] sm:max-w-[190px] md:max-w-[196px] bg-slate-700 h-[1px]" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-full max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-4 justify-center">
                <FaTrophy className="text-yellow-500 w-4 h-4" />
                <span className="text-center text-sm sm:text-base font-semibold text-gray-300">
                  CTF Levels
                </span>
              </div>

              <div className="mb-4">
                <div className="bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedLevels / 40) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {unlockedLevels}/40 Unlocked
                </div>
              </div>

              <motion.div
                variants={listVariants}
                initial="hidden"
                animate={menu ? 'visible' : 'hidden'}
                className="flex flex-col gap-2  
                overflow-y-auto custom-scrollbar"
              >
                {levels.map((level) => {
                  const isUnlocked = level <= unlockedLevels;

                  return (
                    <motion.button
                      key={level}
                      onClick={() => {
                        handleLevelClick(level);
                      }}
                      whileHover={isUnlocked ? { scale: 1.1 } : {}}
                      className={`
                        relative p-2 rounded-lg cursor-pointer
                         text-xs font-bold transition-all
                     hover:opacity-90 hover:text-white       duration-200
                        
                       
                      `}
                    >
                      {level}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default CtfMenu;
