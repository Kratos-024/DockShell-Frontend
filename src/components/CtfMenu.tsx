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
  const { levelId, ctfName } = useParams<{ levelId: string; ctfName: string }>();
  const currentLevel = levelId ? parseInt(levelId.replace('level', ''), 10) : null;
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

  if (!totalLevels || !ctfName) {
    return null;
  }

  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);

  return (
    <>
      <motion.section
        variants={menuVariants}
        initial="hidden"
        animate={menu ? 'visible' : 'hidden'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bg-black/20 backdrop-blur-sm top-0
         left-0 h-screen z-50
          w-[210px] sm:w-[260px] md:w-[210px]
          shadow-2xl border-r border-gray-700"
      >
        <div className="w-[1px] bg-slate-700 right-0 absolute h-screen" />
        <div className="cursor-pointer z-50 absolute right-1 top-2" onClick={menuHandler}>
          <IoMdClose className="w-[28px]  h-[28px] text-white hover:text-red-500 transition-colors" />
        </div>
        <div className="w-full relative mt-4 h-full overflow-y-auto p-3 sm:p-4 md:p-6 pt-4 sm:pt-6 md:pt-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center font-semibold mb-6 sm:mb-8 md:mb-10
              text-xl sm:text-2xl md:text-[28px]"
          >
            <a href="/">{ctfName.charAt(0).toUpperCase() + ctfName.slice(1).toLowerCase()}</a>
          </motion.h2>

          <div className="flex flex-col items-center gap-4 sm:gap-6 text-gray-500 w-full">
            <div className="w-full max-w-[180px] sm:max-w-[190px] md:max-w-[196px] bg-slate-700 h-[1px]" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-full max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-4 justify-center">
                <span className="text-center text-sm sm:text-base font-semibold text-gray-300">
                  {ctfName} Levels
                </span>
              </div>

              <motion.div
                variants={listVariants}
                initial="hidden"
                animate={menu ? 'visible' : 'hidden'}
                className="flex flex-col gap-2 overflow-y-auto custom-scrollbar"
              >
                {levels.map((level) => {
                  const isSelected = level === currentLevel;

                  return (
                    <motion.button
                      key={level}
                      onClick={() => handleLevelClick(level)}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative p-2 rounded-lg text-xs font-bold 
                         duration-200 cursor-pointer
                        ${
                          isSelected
                            ? '  bg-[#bbff34]  text-black shadow-lg'
                            : 'bg-gray-600 text-black hover:bg-[#bbff34]  hover:text-black'
                        }
                      `}
                    >
                      Level {level}
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
