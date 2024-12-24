"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

interface BarGraphProps {
  data: GraphData[];
}

export const BarGraph = ({ data }: BarGraphProps) => {
  const labels = data.map((i) => i.day);
  const amounts = data.map((i) => i.totalAmount);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Sale Amount",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
