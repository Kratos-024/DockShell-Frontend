import { motion } from 'framer-motion';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import CtfMenu from '../components/CtfMenu';
import { CtfBody } from '../components/CtfBody';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LevelServiceInstance from '../services/ctf.service';
import type { LevelData } from '../assets/types';
const skeletonLevelData: LevelData = {
  ctfName: '',
  levelNo: 0,
  id: '',
  uniqueId: 'loading...',
  goal: 'Loading level goal...',
  description: 'Loading level description...',
  commands: ['Loading...'],
  hints: ['Loading hints...'],
  links: ['#'],
  expectedOutput: 'Loading expected output...',
  difficulty: 'beginner',
  category: 'fileexploration',
  estimatedTime: 0,
  createdAt: new Date(),
};
export const CtfPage = ({ menuHandler, menu }: { menu: boolean; menuHandler: () => void }) => {
  const [levelDetails, setLevelDetails] = useState<LevelData>(skeletonLevelData);
  const [totalLevels, settotalLevels] = useState<number>(0);

  const { ctfLevel, ctfName } = useParams();
  useEffect(() => {
    const levelGetterHandler = async () => {
      try {
        if (ctfLevel && ctfName) {
          const response = await LevelServiceInstance.getCtfLevel(ctfName, ctfLevel);
          if ('statusCode' in response && response.statusCode === 200) {
            setLevelDetails(response.data.level);
            settotalLevels(response.data.ctfTotalLevels.totalLevels);
          }
        }
      } catch (error) {
        console.log('Error has been occured in levelGetterHandler', error);
      }
    };
    levelGetterHandler();
  }, []);
  return (
    <motion.section
      initial={{ marginLeft: 0 }}
      animate={{
        marginLeft: menu ? '280px' : '0px',
        width: menu ? 'calc(100% - 280px)' : '100%',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="min-h-screen  relative z-10"
      style={{
        paddingLeft: '0',
        paddingRight: '0',
      }}
    >
      <NavBar menu={menu} menuHandler={menuHandler} />
      <div className="px-3">
        <CtfMenu totalLevels={totalLevels} menuHandler={menuHandler} menu={menu} />
        <CtfBody levelData={levelDetails} nextLevelNumber={+{ ctfLevel } + 1} />
        <Footer />
      </div>
    </motion.section>
  );
};
