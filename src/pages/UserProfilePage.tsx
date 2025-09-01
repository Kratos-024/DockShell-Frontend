import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { UserProfileHero } from '../components/UserProfile';
import LevelServiceInstance from '../services/ctf.service';
import type { levelPorgressResponse } from '../assets/types';
import type { ChartProps } from '../components/Chart';
import type LabInter from '../assets/types';

type SkillsPayload = {
  skills: {
    id: string;
    category: string;
    username: string;
    uniqueId: string;
  }[];
  bio?: string;
  profileImage?: string;
};

type UserProgressResponse =
  | {
      success: true;
      data: {
        allProgress: levelPorgressResponse[];
        skills: SkillsPayload;
        username: string;
      };
    }
  | { success: false; error: string };

type UserProfileData = {
  allProgress: levelPorgressResponse[];
  skills: ChartProps['skills'];
  username: string;
  bio?: string;
  profileImage?: string;
};

export const UserProfilePage = () => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [userLabs, setUserLabs] = useState<LabInter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = (await LevelServiceInstance.getAllUserProgress()) as UserProgressResponse;

        if (response.success && response.data) {
          const { allProgress, skills } = response.data;

          const username = skills.skills[0]?.username || 'User';
          const bio = skills.bio;
          const profileImage = skills.profileImage;

          setProfileData({
            allProgress,
            skills: skills.skills,
            username,
            bio,
            profileImage,
          });
          const ctfListResponse = await LevelServiceInstance.getCtf();
          if ('data' in ctfListResponse && ctfListResponse.data) {
            const userCtfNames = new Set(
              allProgress.map((progress) => progress.ctfName.toLowerCase()),
            );
            const filteredLabs = ctfListResponse.data.filter((lab) =>
              userCtfNames.has(lab.ctfName.toLowerCase()),
            );
            setUserLabs(filteredLabs);
          } else {
            throw new Error(
              (ctfListResponse as { error: string }).error || 'Failed to fetch CTF list.',
            );
          }
        } else {
          throw new Error((response as { error: string }).error || 'Failed to fetch user profile.');
        }
      } catch (err: unknown) {
        console.error('Error fetching user profile data:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <section>
      <div>
        <NavBar isModalOpen={false} handleLoginClick={() => {}} />
        {isLoading && <div className="text-center p-8 text-white">Loading your profile...</div>}
        {error && <div className="text-center p-8 text-red-500">Error: {error}</div>}
        {!isLoading && !error && profileData && (
          <UserProfileHero profileData={profileData} userLabs={userLabs} />
        )}
      </div>
    </section>
  );
};
