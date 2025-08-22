import { useState, useEffect } from "react";
import { BsBrowserEdge } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { FaTrophy, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

interface CtfMenuProps {
  menu: boolean;
  menuHandler: () => void;
}

export const CtfMenu = ({ menu, menuHandler }: CtfMenuProps) => {
  const [feed, setFeed] = useState("Browser");
  const [unlockedLevels] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/WatchlistPage") {
      setFeed("Watchlist");
    } else if (location.pathname === "/ComingSoon") {
      setFeed("Coming Soon");
    } else {
      setFeed("Browser");
    }
  }, [location.pathname]);

  const handleMenuItemClick = (item: string) => {
    setFeed(item);

    if (item === "Watchlist") {
      navigate("/WatchlistPage");
    } else if (item === "Coming Soon") {
      navigate("/ComingSoon");
    } else {
      navigate("/");
    }

    menuHandler();
  };

  const handleLevelClick = (level: number) => {
    if (level <= unlockedLevels) {
      navigate(`/level/${level}`);
      menuHandler();
    }
  };

  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const buttonVariants = {
    hidden: {
      x: -50,
      opacity: 0,
      rotate: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
    },
  };
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const levelVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const levels = Array.from({ length: 40 }, (_, i) => i + 1);

  const getDifficultyColor = (level: number) => {
    if (level <= 10) return "bg-green-500";
    if (level <= 25) return "bg-yellow-500";
    if (level <= 35) return "bg-orange-500";
    return "bg-red-500";
  };

  const getDifficultyText = (level: number) => {
    if (level <= 10) return "Easy";
    if (level <= 25) return "Medium";
    if (level <= 35) return "Hard";
    return "Expert";
  };

  return (
    <>
      <motion.section
        variants={menuVariants}
        initial="hidden"
        animate={menu ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed bg-gray-900/95 backdrop-blur-sm top-0 left-0 h-screen z-50
          w-[240px] sm:w-[260px] md:w-[280px]
          shadow-2xl border-r border-gray-700"
      >
        <div className="w-[1px] bg-slate-700 right-0 absolute h-screen" />

        <div className="w-full relative h-full overflow-y-auto p-3 sm:p-4 md:p-6 pt-4 sm:pt-6 md:pt-8">
          {/* Logo */}
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center font-semibold mb-6 sm:mb-8 md:mb-10
              text-xl sm:text-2xl md:text-[28px]"
          >
            <a href="/" onClick={() => menuHandler()}>
              <span className="text-white">CTF</span>
              <span className="text-red-600">Labs</span>
            </a>
          </motion.h2>

          <div className="flex flex-col items-center gap-4 sm:gap-6 text-gray-500 w-full">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-center text-base sm:text-lg md:text-[21px]"
            >
              Navigation
            </motion.span>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate={menu ? "visible" : "hidden"}
              className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full"
            >
              {["Browser", "Watchlist", "Coming Soon"].map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  onClick={() =>
                    item !== "Coming Soon" ? handleMenuItemClick(item) : null
                  }
                  whileHover={
                    item !== "Coming Soon" ? { scale: 1.05, x: 5 } : {}
                  }
                  whileTap={item !== "Coming Soon" ? { scale: 0.95 } : {}}
                  className={`${
                    feed === item ? "text-white" : ""
                  } flex items-center gap-2 sm:gap-3 md:gap-4 relative ${
                    item === "Coming Soon"
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer text-gray-600 hover:text-gray-300"
                  } p-2 rounded-lg transition-all duration-200`}
                >
                  <motion.span
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: feed === item ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-8 sm:h-10 md:h-[46px] 
                      left-[-12px] sm:left-[-16px] md:left-[-24px] 
                      absolute w-1 bg-red-700 origin-center rounded-full"
                  />

                  <motion.div
                    whileHover={item !== "Coming Soon" ? { rotate: 5 } : {}}
                    className={`${
                      feed === item ? "bg-red-500" : "bg-gray-700"
                    } p-1.5 sm:p-2 rounded-full text-white 
                      transition-colors duration-200 ${
                        item === "Coming Soon"
                          ? "opacity-50"
                          : "hover:bg-red-400"
                      }`}
                  >
                    {item === "Browser" && (
                      <BsBrowserEdge className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    {item === "Watchlist" && (
                      <CiHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    {item === "Coming Soon" && (
                      <SlCalender className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </motion.div>

                  <span
                    className={`font-semibold text-sm sm:text-base md:text-lg ${
                      item === "Coming Soon" ? "opacity-50" : ""
                    }`}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Divider */}
            <div className="w-full max-w-[180px] sm:max-w-[190px] md:max-w-[196px] bg-slate-700 h-[1px]" />

            {/* CTF Levels Section */}
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

              {/* Progress Bar */}
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

              {/* Levels Grid */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate={menu ? "visible" : "hidden"}
                className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar"
              >
                {levels.map((level) => {
                  const isUnlocked = level <= unlockedLevels;
                  const isCompleted = level < unlockedLevels;

                  return (
                    <motion.button
                      key={level}
                      variants={levelVariants}
                      onClick={() => handleLevelClick(level)}
                      disabled={!isUnlocked}
                      whileHover={isUnlocked ? { scale: 1.1 } : {}}
                      whileTap={isUnlocked ? { scale: 0.9 } : {}}
                      className={`
                        relative p-2 rounded-lg text-xs font-bold transition-all duration-200
                        ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isUnlocked
                            ? `${getDifficultyColor(
                                level
                              )} text-white hover:opacity-80`
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }
                        ${
                          level === unlockedLevels && !isCompleted
                            ? "ring-2 ring-yellow-400 animate-pulse"
                            : ""
                        }
                      `}
                      title={
                        isUnlocked
                          ? `Level ${level} - ${getDifficultyText(level)}`
                          : "Locked"
                      }
                    >
                      {!isUnlocked && (
                        <FaLock className="absolute top-1 right-1 w-2 h-2" />
                      )}
                      {isCompleted && (
                        <FaTrophy className="absolute top-0 right-0 w-2 h-2 text-yellow-300" />
                      )}
                      {level}
                    </motion.button>
                  );
                })}
              </motion.div>

              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-400">1-10: Easy</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-gray-400">11-25: Medium</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-gray-400">26-35: Hard</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400">36-40: Expert</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate={menu ? "visible" : "hidden"}
        onClick={menuHandler}
        whileHover={{
          scale: 1.1,
          backgroundColor: "rgb(239 68 68)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 z-[60] 
          left-[250px] sm:left-[270px] md:left-[290px]
          w-10 h-10 bg-gray-800 hover:bg-red-500 
          rounded-full border border-gray-600 hover:border-red-400
          flex items-center justify-center
          shadow-lg transition-all duration-200
          backdrop-blur-sm"
      >
        <motion.div
          variants={iconVariants}
          animate={menu ? "open" : "closed"}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          {menu ? (
            <FaChevronLeft className="w-4 h-4 text-white" />
          ) : (
            <FaChevronRight className="w-4 h-4 text-white" />
          )}
        </motion.div>
      </motion.button>
    </>
  );
};

export default CtfMenu;
