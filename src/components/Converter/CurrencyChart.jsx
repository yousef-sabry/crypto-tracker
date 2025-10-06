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
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CurrencyChart = ({ data, currency }) => {
  if (!data || data.length === 0) return <p>Loading chart...</p>;

  const labels = data.map(item => item.date); // تواريخ الأيام
  const prices = data.map(item => item.price); // أسعار العملة

  const chartData = {
    labels,
    datasets: [
      {
        label: `${currency}/EGP`,
        data: prices,
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.2)",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Price History of ${currency}/EGP` }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default CurrencyChart;
