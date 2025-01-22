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

// Chart.js에 필요한 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherGraph = ({ weeklyWeather }) => {
  const data = {
    labels: weeklyWeather.map((weather) =>
      new Date(weather.dt_txt).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
      })
    ),
    datasets: [
      {
        label: "온도 변화 (°C)",
        data: weeklyWeather.map((weather) => weather.main.temp),
        borderColor: "rgba(75, 192, 192, 1)", // 선 색상
        borderWidth: 2, // 선 두께
        backgroundColor: "transparent", // 차트 채우기 없음
        tension: 0.4, // 선의 곡선 정도
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "오늘의 온도 변화",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "시간",
        },
      },
      y: {
        title: {
          display: true,
          text: "온도 (°C)",
        },
        beginAtZero: false, // 온도가 0에서 시작하지 않음
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherGraph;
