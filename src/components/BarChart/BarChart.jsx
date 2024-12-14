import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Tài liệu 1", "Tài liệu 2", "Tài liệu 3", "Tài liệu 4"],
  datasets: [
    {
      label: "Phần trăm đạo văn",
      data: [20, 35, 50, 10], // phần trăm đạo văn cho từng tài liệu
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};

const options = {
  scales: {
    y: {
      max: 5,
      min: 0,
      ticks: {
        stepSize: 0.5,
      },
    },
  },
};

const BarChart = () => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
