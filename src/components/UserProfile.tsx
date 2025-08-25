import { useState } from "react";
import { LabSection } from "./LabSection";
import { labs } from "../assets/contstant";
import { Chart } from "./Chart";
import { CTFProgress } from "./CTFProgress";

// const ProfileSection = () => {
//   return (
//     <div
//       className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8
//       px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8"
//     >
//       {/* Main Content */}
//       <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
//         {/* Favorite Films */}
//         <div>
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <h2
//               className="text-gray-400 uppercase tracking-wide
//               text-xs sm:text-sm"
//             >
//               Favorite Films
//             </h2>
//           </div>
//           <p
//             className="text-gray-400
//             text-sm sm:text-base"
//           >
//             Don't forget to select your{" "}
//             <span className="text-orange-500">favorite films</span>!
//           </p>
//         </div>

//         <div>
//           <div className="flex items-center justify-between mb-4 sm:mb-6">
//             <h2
//               className="text-gray-400 uppercase tracking-wide
//               text-xs sm:text-sm"
//             >
//               Recent Reviews
//             </h2>
//             <button
//               className="text-gray-400 hover:text-white
//               text-xs sm:text-sm"
//             >
//               MORE
//             </button>
//           </div>

//         </div>
//       </div>

//       <div className="space-y-4 sm:space-y-6 md:space-y-8">
//         <div>
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <h2
//               className="text-gray-400 uppercase tracking-wide
//               text-xs sm:text-sm"
//             >
//               Diary
//             </h2>
//             <button
//               className="text-gray-400 hover:text-white
//               text-xs sm:text-sm"
//             >
//               1
//             </button>
//           </div>

//         </div>

//         <div>
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <h2
//               className="text-gray-400 uppercase tracking-wide
//               text-xs sm:text-sm"
//             >
//               Ratings
//             </h2>
//             <button
//               className="text-gray-400 hover:text-white
//               text-xs sm:text-sm"
//             >
//               1
//             </button>
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span
//                 className="text-green-500
//                 text-sm sm:text-base"
//               >
//                 ★
//               </span>
//               <div className="flex-1 mx-2 sm:mx-3 bg-gray-700 h-2 rounded">
//                 <div className="bg-gray-600 h-2 rounded w-full" />
//               </div>
//               <span
//                 className="text-green-500
//                 text-sm sm:text-base"
//               >
//                 ★★★★★
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Activity */}
//         <div>
//           <h2
//             className="text-gray-400 uppercase tracking-wide mb-3 sm:mb-4
//             text-xs sm:text-sm"
//           >
//             Activity
//           </h2>
//           <p
//             className="text-gray-400
//             text-xs sm:text-sm"
//           >
//             No recent activity
//           </p>
//         </div>

//         {/* Upgrade Card */}
//         <div
//           className="bg-gradient-to-r from-gray-800 to-gray-700
//           rounded-lg p-3 sm:p-4 md:p-6 relative overflow-hidden"
//         >
//           <div className="relative z-10">
//             <h3
//               className="text-white font-bold mb-1 sm:mb-2
//               text-base sm:text-lg md:text-xl"
//             >
//               NEED AN UPGRADE?
//             </h3>
//             <p
//               className="text-gray-300 mb-2 sm:mb-3 md:mb-4
//               text-xs sm:text-sm"
//             >
//               Profile stats, filtering by favorite streaming services, watchlist
//               alerts and no ads!
//             </p>
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white
//               px-3 sm:px-4 py-1.5 sm:py-2 rounded font-medium
//               flex items-center gap-1 sm:gap-2
//               text-xs sm:text-sm
//               transition-colors duration-200"
//             >
//               GET
//               <span
//                 className="bg-green-700 px-1 sm:px-2 py-0.5 sm:py-1
//                 rounded text-xs"
//               >
//                 PRO
//               </span>
//             </button>
//           </div>
//           <div
//             className="absolute right-0 top-0 w-16 sm:w-20 md:w-24 h-full
//             bg-gradient-to-l from-orange-500 to-transparent opacity-20"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export const UserProfileHero = () => {
  const [navigation, setNavigation] = useState("Rooms");

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
        {navigation === "Progress" && <CTFProgress />}
      </div>
    </section>
  );
};
