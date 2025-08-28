import { useEffect, useState } from "react";
import { LabSection } from "./LabSection";
import { labs } from "../assets/contstant";
import { Chart } from "./Chart";
import { CTFProgress } from "./CTFProgress";
import LevelServiceInstance from "../services/ctf.service";
import type { levelPorgressResponse } from "../assets/types";
type UserProgressResponse =
  | { success: true; data: levelPorgressResponse[] }
  | { success: false; error: string };

export const UserProfileHero = () => {
  const [navigation, setNavigation] = useState("Rooms");
  const [levelPorgressData, setLevelProgressData] = useState<
    levelPorgressResponse[]
  >([
    {
      id: "",
      ctfName: "",
      username: "",
      ctfClaimeds: [
        {
          ctfProgressId: "",
          id: "",
          levelNo: 0,
          password: "",
        },
      ],
    },
  ]);
  useEffect(() => {
    const getAllUserProgressHandler = async () => {
      try {
        const response: UserProgressResponse =
          await LevelServiceInstance.getAllUserProgress();
        if (response.success) {
          setLevelProgressData(response.data);
        } else {
          console.error("Error fetching progress:", response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllUserProgressHandler();
  }, []);
  const navigationHandler = (nav: string) => {
    setNavigation(nav);
  };
  return (
    <section
      className="w-full min-h-screen 
      pb-12 sm:pb-16 md:pb-24"
    >
      <div className="relative">
        <img
          className="w-full object-cover
            h-[200px] sm:h-[250px] md:h-[300px] lg:h-[340px]"
          src="https://media.gettyimages.com/id/1798302631/video/no-tv-signal-vhs-noise-glitch-screen-overlay-grunge-old-tv-background.jpg?s=640x640&k=20&c=yrNzn6bNDtn7XWeLiVMkfNg9RhFUWHfwtyDiaXS5eaI="
          alt="user-profile-hero"
        />

        <div
          className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 md:gap-6 
          px-2 sm:px-4 md:px-6 lg:px-8 
          -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 
          relative z-10"
        >
          <img
            loading="lazy"
            className="rounded-full object-cover border-4
             border-white shadow-lg
            
             lg:w-48 lg:h-48 xl:w-[246px] xl:h-[246px]
              mx-auto lg:mx-0"
            src={
              "https://secure.gravatar.com/avatar/0a36713aa63972a957a0eb366e8b0194.jpg?s=200&d=robohash&r=x"
            }
            alt="profile"
          />

          <div
            className="flex-1 flex flex-col lg:flex-row justify-between 
            items-center lg:items-start text-center lg:text-left
            mt-2 sm:mt-4 md:mt-6 lg:mt-20 xl:mt-[86px]
            w-full"
          >
            <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-4 lg:mb-2">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <h1
                  className="text-white font-bold whitespace-nowrap
                  text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  Kratos
                </h1>
              </div>

              <p
                className="text-gray-300 mb-2 sm:mb-4 md:mb-6
                text-sm sm:text-base lg:text-lg"
              >
                It makes you forget the wonderful yesterday
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="border-b border-gray-700 mt-4 sm:mt-6
       md:mt-8"
      >
        <nav
          className="flex justify-center lg:justify-center 
          space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8 
          px-2 sm:px-4 md:px-6 lg:px-8  gap-6
          overflow-x-auto scrollbar-hide"
        >
          {["Rooms", "Skills", "Progress"].map((tab) => (
            <button
              onClick={() => navigationHandler(tab)}
              key={tab}
              className={`py-2 sm:py-3 px-1 sm:px-2 border-b-2 
                font-medium text-[22px]  
                whitespace-nowrap transition-colors duration-200
                text-xs  md:text-base ${
                  tab === navigation
                    ? "border-orange-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        {navigation === "Rooms" && (
          <LabSection header={"User Rooms"} labs={labs} />
        )}
        {navigation === "Skills" && <Chart />}
        {navigation === "Progress" && (
          <CTFProgress levelPorgressData={levelPorgressData} />
        )}
      </div>
    </section>
  );
};
