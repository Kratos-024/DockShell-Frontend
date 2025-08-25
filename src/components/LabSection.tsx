import { Link } from "react-router-dom";
import type LabInter from "../assets/types";

const LabCard = ({ lab }: { lab: LabInter }) => {
  return (
    <div
      data-slot="card"
      className="text-card-foreground flex flex-col max-md:w-[380px] mx-auto max-md:pb-3
       gap-4 md:gap-6 rounded-xl border shadow-sm
        group cursor-pointer transition-all
         duration-300 hover:shadow-lg
          hover:shadow-green-500/20 hover:-translate-y-1
           border-green-800/30 hover:border-green-500/50
            bg-gray-900/50 backdrop-blur-sm h-full"
    >
      <div
        data-slot="card-header"
        className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] 
        items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 p-0"
      >
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            alt={lab.title}
            className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            src={lab.imgSrc}
          />
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col sm:flex-row gap-1 sm:gap-2">
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center rounded-md border px-1.5 sm:px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden bg-green-500/20 text-green-400 border-green-500/30"
            >
              {lab.difficulty}
            </span>

            <span
              data-slot="badge"
              className=" items-center justify-center rounded-md border px-1.5 sm:px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden bg-gray-900/80 backdrop-blur-sm border-green-700/50 text-green-300 hidden sm:inline-flex"
            >
              {lab.topic}
            </span>
          </div>
        </div>
      </div>

      <div
        data-slot="card-content"
        className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col"
      >
        <div className="space-y-2 md:space-y-3 flex-1">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-100 group-hover:text-green-400 transition-colors line-clamp-2">
            {lab.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
            {lab.subHeader}
          </p>

          {/* Solved + CTA */}
          <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users w-3 h-3 sm:w-4 sm:h-4 text-green-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-xs sm:text-sm font-medium">
                {lab.solved} solved
              </span>
            </div>
            <div className="text-xs text-green-400 hidden sm:block">
              Click to explore →
            </div>
            <div className="text-xs text-green-400 block sm:hidden">→</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LabSection = ({
  header,
  labs,
}: {
  header: string;
  labs: LabInter[];
}) => {
  return (
    <section className="w-full pt-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-green-600 mb-6 md:mb-8">
          {header}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 md:gap-6">
          <Link to={`/ctf/level0/frostling`}>
            {" "}
            {labs.map((lab: LabInter, idx: number) => {
              return <LabCard key={idx} lab={lab} />;
            })}
          </Link>
        </div>
      </div>
    </section>
  );
};
