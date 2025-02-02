import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ labels, data, component }) => {
  // Define colors based on component type
  const theme = component === "revenue"
    ? {
        title: "Revenue Statistics",
        borderColor: "#FF8C00", // Warm Orange
        backgroundColor: "rgba(255, 140, 0, 0.2)",
        pointColor: "#34D399", // Soft Green
        tooltipLabel: "Revenue",
      }
    : {
        title: "Customer Per Day",
        borderColor: "#A78BFA", // Light Purple
        backgroundColor: "rgba(167, 139, 250, 0.2)",
        pointColor: "#6B7280", // Gray
        tooltipLabel: "Customers",
      };

  const chartData = {
    labels, // Keep all labels for tooltip visibility
    datasets: [
      {
        label: "Last 15 days",
        data,
        borderColor: theme.borderColor,
        backgroundColor: theme.backgroundColor,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: theme.pointColor,
        pointBorderColor: "#fff",
        tension: 0.4, // Smooth Curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => `Date: ${tooltipItems[0].label}`, // Show date on hover
          label: (tooltipItem) => `${theme.tooltipLabel}: ${tooltipItem.raw.toFixed(2)}`,
        },
        backgroundColor: "#222",
        titleColor: theme.borderColor,
        bodyColor: "#fff",
        borderColor: theme.borderColor,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false }, // Hide X-axis labels
      },
      y: {
        grid: { color: "#ddd" },
        ticks: { color: "#333", font: { size: window.innerWidth < 768 ? 10 : 14 } },
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-xl border border-gray-200">
      <h2 className="text-gray-800 text-xl font-semibold text-center mb-4 font-kugile">
        {theme.title}
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
