/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { LabSection } from './LabSection';
import { CTFProgress } from './CTFProgress';
import LevelServiceInstance from '../services/ctf.service';
import UserServicesInstance from '../services/user.service';
import type { levelPorgressResponse } from '../assets/types';
import type LabInter from '../assets/types';
import Chart, { type ChartProps } from './Chart';

type UserProgressResponse =
  | {
      success: true;
      data: {
        allProgress: levelPorgressResponse[];
        skills: ChartProps;
      };
    }
  | { success: false; error: string };

export const UserProfileHero = () => {
  const [navigation, setNavigation] = useState('Rooms');
  const [skills, setSkills] = useState<ChartProps['skills']>([
    { id: '', category: '', username: '', uniqueId: '' },
  ]);
  const [userLabs, setUserLabs] = useState<LabInter[]>([]);
  const [levelProgressData, setLevelProgressData] = useState<levelPorgressResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    'https://secure.gravatar.com/avatar/0a36713aa63972a957a0eb366e8b0194.jpg?s=200&d=robohash&r=x',
  );
  const [username, setUsername] = useState<string | undefined>('');

  const [bio, setBio] = useState<string | undefined>('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setIsLoading(true);
        //@ts-ignore
        const response: UserProgressResponse = await LevelServiceInstance.getAllUserProgress();
        if (response.success && response.data) {
          setBio(response.data.skills.bio);

          setUsername(response.data.skills.username);
          setProfileImage(response.data.skills.profileImage);
          setLevelProgressData(response.data.allProgress);
          setSkills(response.data.skills.skills);
        } else if (!response.success) {
          throw new Error(response.error || 'Failed to fetch user progress.');
        }
      } catch (err: unknown) {
        console.error('Error fetching progress:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProgress();
  }, []);

  useEffect(() => {
    if (levelProgressData.length === 0) {
      return;
    }
    const fetchAndFilterCtfs = async () => {
      try {
        const response = await LevelServiceInstance.getCtf();
        if ('data' in response && response.data) {
          const userCtfNames = new Set(
            levelProgressData.map((progress) => progress.ctfName.toLowerCase()),
          );
          const filteredLabs = response.data.filter((lab) =>
            userCtfNames.has(lab.ctfName.toLowerCase()),
          );
          setUserLabs(filteredLabs);
        } else {
          throw new Error((response as { error: string }).error || 'Failed to fetch CTF list.');
        }
      } catch (err: unknown) {
        console.error('Error fetching CTFs:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred while filtering labs.');
        }
      }
    };
    fetchAndFilterCtfs();
  }, [levelProgressData]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(URL.createObjectURL(file));

      const response = await UserServicesInstance.addImage(file);
      if (response.error) {
        setError(response.error);
        setProfileImage(
          'https://secure.gravatar.com/avatar/0a36713aa63972a957a0eb366e8b0194.jpg?s=200&d=robohash&r=x',
        );
      } else if (response.data) {
        setProfileImage(response.data.imageUrl);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };
  //@ts-ignore
  const handleBioKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditingBio(false);
      const response = await UserServicesInstance.updateBio(bio);
      if (response.error) {
        setError(response.error);
      }
    }
  };

  const navigationHandler = (nav: string) => {
    setNavigation(nav);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center p-8 text-white">Loading your profile...</div>;
    }
    if (error) {
      return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }
    switch (navigation) {
      case 'Rooms':
        return <LabSection header={'My Rooms'} labs={userLabs} />;
      case 'Skills':
        return <Chart skills={skills} />;
      case 'Progress':
        return <CTFProgress levelPorgressData={levelProgressData} />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full min-h-screen pb-12 sm:pb-16 md:pb-24">
      <div className="relative">
        <img
          className="w-full object-cover h-[200px] sm:h-[250px] md:h-[300px] lg:h-[340px]"
          src="https://media.gettyimages.com/id/1798302631/video/no-tv-signal-vhs-noise-glitch-screen-overlay-grunge-old-tv-background.jpg?s=640x640&k=20&c=yrNzn6bNDtn7XWeLiVMkfNg9RhFUWHfwtyDiaXS5eaI="
          alt="user-profile-hero"
        />
        <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 relative z-10">
          <div className="relative mx-auto lg:mx-0">
            <img
              loading="lazy"
              className="rounded-full object-cover border-4 border-white shadow-lg w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-[246px] xl:h-[246px] cursor-pointer"
              src={profileImage}
              alt="profile"
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="flex-1 flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left mt-2 sm:mt-4 md:mt-6 lg:mt-20 xl:mt-[86px] w-full">
            <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-4 lg:mb-2">
              <h1 className="text-white font-bold whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                {username}
              </h1>
              {isEditingBio ? (
                <input
                  type="text"
                  value={bio}
                  onChange={handleBioChange}
                  onKeyDown={handleBioKeyDown}
                  onBlur={() => setIsEditingBio(false)}
                  className="text-gray-300 bg-gray-800 border-b border-gray-500 text-sm sm:text-base lg:text-lg"
                  autoFocus
                />
              ) : (
                <p
                  className="text-gray-300 mb-2 sm:mb-4 md:mb-6 text-sm sm:text-base lg:text-lg cursor-pointer"
                  onClick={() => setIsEditingBio(true)}
                >
                  {bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-700 mt-4 sm:mt-6 md:mt-8">
        <nav className="flex justify-center lg:justify-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8 px-2 sm:px-4 md:px-6 lg:px-8 gap-6 overflow-x-auto scrollbar-hide">
          {['Rooms', 'Skills', 'Progress'].map((tab) => (
            <button
              onClick={() => navigationHandler(tab)}
              key={tab}
              className={`py-2 sm:py-3 px-1 sm:px-2 border-b-2 font-medium text-lg md:text-xl whitespace-nowrap transition-colors duration-200 ${
                tab === navigation
                  ? 'border-orange-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-8">{renderContent()}</div>
      </div>
    </section>
  );
};
