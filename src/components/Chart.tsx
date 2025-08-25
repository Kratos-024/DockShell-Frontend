import { useState } from "react";
import {
  Chart as ChartJs,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJs.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const chartData = {
  entry: {
    labels: ["fileExploration", "crypto", "forensics", "web", "network"],
    datasets: [
      {
        label: "Entry Level Skills",
        data: [3, 2, 4, 5, 3],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(34, 197, 94)",
      },
    ],
  },
  medium: {
    labels: ["fileExploration", "crypto", "forensics", "web", "network"],
    datasets: [
      {
        label: "Medium Level Skills",
        data: [6, 5, 7, 8, 6],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(59, 130, 246)",
      },
    ],
  },
  hard: {
    labels: ["fileExploration", "crypto", "forensics", "web", "network"],
    datasets: [
      {
        label: "Advanced Level Skills",
        data: [9, 8, 10, 10, 9],
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(239, 68, 68)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(239, 68, 68)",
      },
    ],
  },
};

const options = {
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
    },
  },
  scales: {
    r: {
      angleLines: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      pointLabels: {
        color: "#ffffff",
      },
      ticks: {
        color: "#ffffff",
        backdropColor: "transparent",
      },
    },
  },
};

export const Chart = () => {
  const [level, setLevel] = useState("entry");

  return (
    <div className="flex flex-col items-center w-full py-6">
      <div className="text-center mb-6">
        <h2 className="text-white text-3xl font-bold mb-2">
          My Security Skills
        </h2>
        <p className="text-gray-400">Choose difficulty level to see progress</p>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setLevel("entry")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            level === "entry"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Entry Level
        </button>
        <button
          onClick={() => setLevel("medium")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            level === "medium"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Medium Level
        </button>
        <button
          onClick={() => setLevel("hard")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            level === "hard"
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Advanced Level
        </button>
      </div>

      <div className="w-[720px] h-[720px]">
        <Radar data={chartData[level]} options={options} />
      </div>
    </div>
  );
};
