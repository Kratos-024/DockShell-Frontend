/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Chart as ChartJs,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJs.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export interface Skill {
  id: string;
  category: string;
  username: string;
  uniqueId: string;
}

export interface ChartProps {
  skills?: Skill[];
  profileImage?: string;
  username?: string;
  bio?: string;
}

type DifficultyLevel = 'entry' | 'medium' | 'hard';

const Chart = ({ skills = [] }: ChartProps) => {
  const [level, setLevel] = useState<DifficultyLevel>('entry');
  const allCategories = ['filEexploration', 'crypto', 'binary', 'forensics', 'web', 'network'];
  const skillCounts: Record<string, number> = allCategories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((skill) => skill.category === category).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const hasAnySkills = skills.length > 0;
  const totalSkillCount = Object.values(skillCounts).reduce((sum, count) => sum + count, 0);
  const generateChartData = (difficultyLevel: DifficultyLevel) => {
    const multipliers: Record<DifficultyLevel, number> = {
      entry: 5,
      medium: 2,
      hard: 3,
    };

    const data = allCategories.map((category) => {
      const baseCount = skillCounts[category];
      return hasAnySkills ? baseCount * multipliers[difficultyLevel] : 0;
    });

    const colors: Record<DifficultyLevel, { bg: string; border: string }> = {
      entry: { bg: 'rgba(34, 197, 94, 0.2)', border: 'rgb(34, 197, 94)' },
      medium: { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgb(59, 130, 246)' },
      hard: { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgb(239, 68, 68)' },
    };

    const levelNames: Record<DifficultyLevel, string> = {
      entry: 'Entry Level',
      medium: 'Medium Level',
      hard: 'Advanced Level',
    };

    return {
      labels: allCategories,
      datasets: [
        {
          label: `${levelNames[difficultyLevel]} Skills`,
          data: data,
          backgroundColor: colors[difficultyLevel].bg,
          borderColor: colors[difficultyLevel].border,
          borderWidth: 2,
          pointBackgroundColor: colors[difficultyLevel].border,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors[difficultyLevel].border,
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        callbacks: {
          label: function (context: any) {
            const category = context.label;
            const actualCount = skillCounts[category];
            return `${category}: ${actualCount} skill(s)`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: hasAnySkills ? Math.max(10, Math.max(...Object.values(skillCounts)) * 3) : 10,
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
          backdropColor: 'transparent',
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full py-6">
      <div className="text-center mb-6">
        <h2 className="text-white text-3xl font-bold mb-2">My Security Skills</h2>
        <p className="text-gray-400">
          Total skills: {totalSkillCount} across{' '}
          {Object.values(skillCounts).filter((count) => count > 0).length} categories
        </p>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setLevel('entry')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            level === 'entry'
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Entry Level
        </button>
        <button
          className="px-6 py-2 rounded-lg font-medium bg-gray-800 text-gray-500 cursor-not-allowed relative group"
          disabled
          title="Complete more challenges to unlock"
        >
          Medium Level
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            🔒 Complete more challenges to unlock
          </span>
        </button>
        <button
          className="px-6 py-2 rounded-lg font-medium bg-gray-800 text-gray-500 cursor-not-allowed relative group"
          disabled
          title="Complete advanced challenges to unlock"
        >
          Advanced Level
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            🔒 Complete advanced challenges to unlock
          </span>
        </button>
      </div>

      <div className="w-[720px] h-[720px]">
        <Radar data={generateChartData(level)} options={options} />
      </div>

      {!hasAnySkills && (
        <div className="text-center mt-6 p-8 bg-gray-800/50 rounded-lg">
          <p className="text-gray-400 text-lg mb-2">No skills data available yet</p>
          <p className="text-gray-500">
            Complete some CTF challenges to start building your skill profile!
          </p>
        </div>
      )}
    </div>
  );
};

export default Chart;
