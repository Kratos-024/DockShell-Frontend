import { useEffect, useState } from 'react';
import { CtfHero } from '../components/CtfHero';
import { Footer } from '../components/Footer';
import { LabSection } from '../components/LabSection';
import { NavBar } from '../components/NavBar';
import { Shield, Globe, Lock, AlertTriangle } from 'lucide-react';
import LevelServiceInstance from '../services/ctf.service';
import type LabInter from '../assets/types';

export const CtfsPage = ({
  isModalOpen,
  handleLoginClick,
}: {
  isModalOpen: boolean;
  handleLoginClick: () => void | undefined;
}) => {
  const [labs, setLabs] = useState<LabInter[]>([
    {
      ctfName: '',
      totalLevels: 0,
      title: '',
      imgSrc: '',
      totalPlayers: 0,
      subHeader: '',
      difficulty: '',
      topic: 's',
    },
  ]);
  useEffect(() => {
    const getCtfHandler = async () => {
      try {
        const response = await LevelServiceInstance.getCtf();
        console.log(response);
        if ('data' in response) {
          console.log(response);
          setLabs(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.log('Error has been occured', error);
      }
    };
    getCtfHandler();
  }, []);
  return (
    <section
      className="bg-gradient-to-br
     from-background via-card to-background"
    >
      <NavBar isModalOpen={isModalOpen} handleLoginClick={handleLoginClick} />
      <div>
        {' '}
        <div className=" inset-0 opacity-10 -z-10">
          <Shield className="absolute top-20 left-10 h-12 w-12 text-primary animate-pulse" />
          <Lock className="absolute top-32 right-16 h-8 w-8 text-accent animate-pulse delay-1000" />
          <Globe className="absolute bottom-40 left-20 h-10 w-10 text-primary animate-pulse delay-500" />
          <AlertTriangle className="absolute bottom-20 right-12 h-6 w-6 text-accent animate-pulse delay-1500" />
        </div>
        <CtfHero />
        <LabSection labs={labs} header={'Labs'} />
      </div>{' '}
      <Footer />
    </section>
  );
};
