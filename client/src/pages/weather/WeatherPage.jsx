import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./WeatherPage.css";
import axios from "axios";
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [setYesterdayWeather] = useState(null);
  const [location, setLocation] = useState({ lat: 37.5665, lon: 126.9780 }); // 서울 기본 위치
  const outfitSectionRef = useRef(null);
  
  const scrollToOutfitSection = () => {
    if (outfitSectionRef.current) {
      outfitSectionRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

    // 현재 시간 계산
    const currentTime = Math.floor(new Date().getTime() / 1000); // 현재 시간 (초 단위)
    const yesterdayTime = currentTime - 86400; // 24시간 전 (초 단위)

  // 날씨 데이터 및 위치 정보 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  useEffect(() => {
    const { lat, lon } = location;

    // 현재 날씨 가져오기
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATEHER_API_KEY}`
      )
      .then((res) => setWeather(res.data))
      .catch((err) => console.error("현재 날씨 요청 오류:", err));
      
    // 어제 날씨 가져오기
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${yesterdayTime}&appid=${process.env.REACT_APP_WEATEHER_API_KEY}`
      )
      .then((res) => setYesterdayWeather(res.data))
      .catch((err) => console.error("어제 날씨 요청 오류:", err));

    // 5일치 날씨 예보 가져오기
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATEHER_API_KEY}`
      )
      .then((res) => setForecast(res.data))
      .catch((err) => console.error("날씨 예보 요청 오류:", err));
  }, [location,yesterdayTime]);

  // 온도 및 날씨 아이콘 계산
  const temperature = weather
    ? Math.round(weather.main.temp - 273.15)
    : "정보 없음";
  const feelsLike = weather
    ? Math.round(weather.main.feels_like - 273.15)
    : "정보 없음";
  const tempMax = weather
    ? Math.round(weather.main.temp_max - 273.15)
    : "정보 없음";
  const tempMin = weather
    ? Math.round(weather.main.temp_min - 273.15)
    : "정보 없음";
  const windSpeed = weather ? weather.wind.speed : "정보 없음";
  const weatherIcon = weather?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : null;




  // 날씨 예보 데이터 가공
  const forecastData = forecast
  ? {
      labels: forecast.list
        .filter((item) => {
          const itemDate = new Date(item.dt_txt);
          const now = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(now.getDate() + 1);

          // 오늘 또는 내일의 데이터만 필터링
          return itemDate.getDate() === now.getDate() || itemDate.getDate() === tomorrow.getDate();
        })
        .map((item) =>
          new Date(item.dt_txt).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
          })
        ),
      datasets: [
        {
          label: "온도 변화 (°C)",
          data: forecast.list
            .filter((item) => {
              const itemDate = new Date(item.dt_txt);
              const now = new Date();
              const tomorrow = new Date();
              tomorrow.setDate(now.getDate() + 1);

              // 오늘 또는 내일의 데이터만 필터링
              return itemDate.getDate() === now.getDate() || itemDate.getDate() === tomorrow.getDate();
            })
            .map((item) => item.main.temp - 273.15),
          borderColor: "rgba(75, 192, 192, 1)", // 선 색상
          backgroundColor: "rgba(75, 192, 192, 1)", // 채우기 없음
          borderWidth: 2, // 선 두께
          tension: 0.4, // 선의 곡선 정도
        },
      ],
    }
  : null;

  // 의상 추천 데이터 (임시 데이터)
  const outfitRecommendations = [
    {
      label: "코트",
      image: "https://image.msscdn.net/thumbnails/images/goods_img/20241113/4612489/4612489_17316307599301_500.jpg?w=780", // 이미지 링크 추가
    },
    {
      label: "스웨터",
      image: "https://image.msscdn.net/thumbnails/images/goods_img/20240827/4375639/4375639_17247455335087_500.jpg?w=780", // 이미지 링크 추가
    },
    {
      label: "모자",
      image: "https://image.msscdn.net/thumbnails/images/goods_img/20241127/4638919/4638919_17326819310173_500.jpg?w=780", // 이미지 링크 추가
    },
  ];
  

  const dailyForecast = forecast
  ? forecast.list.reduce((acc, item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = item;
      }
      return acc;
    }, {})
  : {}; // forecast가 없으면 빈 객체로 초기화

  //주간 날씨 / 최고,최저 기온을 추가
  const fiveDayForecast = Object.values(dailyForecast).slice(0, 5).map(item => {
    const dayForecasts = forecast.list.filter(f => 
      new Date(f.dt_txt).toLocaleDateString() === new Date(item.dt_txt).toLocaleDateString()
    );
    const maxTemp = Math.max(...dayForecasts.map(f => f.main.temp_max));
    const minTemp = Math.min(...dayForecasts.map(f => f.main.temp_min));
    return {
      ...item,
      maxTemp: Math.round(maxTemp - 273.15),
      minTemp: Math.round(minTemp - 273.15)
    };
  });
  

  
  return (
    <div className="weather-page">
      <Header />

      {/* 상단 날씨 정보 */}
      <section className="weather-section">
        <div className="weather-content">
          <div className="weather-details">
            <div className="weather-icon-container">
              {weatherIcon && (
                <img
                  src={weatherIcon}
                  alt="Weather Icon"
                  className="weather-icon"
                />
              )}
            </div>
            <div className="weather-info">
            <h1>오늘의 날씨</h1>
            <p className="temperature">{temperature}°C</p>
            <div className="weather-buttons">
              <button className="weather-button">
                최고 온도 : {tempMax}°C / 최저 온도 : {tempMin}°C
              </button>
              <button className="weather-button">
                현재 풍속 : {windSpeed} m/s
              </button>

            </div>
              <button className="ai-recommendation" onClick={scrollToOutfitSection}>AI 기반 옷 추천 보기</button>
            </div>
          </div>
        </div>
      </section>

      {/* 날씨 그래프 */}
      <section className="weather-graph-section">
        <h2>오늘의 온도 변화</h2>
        {forecastData ? (
          <Line data={forecastData} />
        ) : (
          <p>날씨 데이터를 불러오는 중...</p>
        )}
      </section>

      {/* 요일별 날씨 정보 */}
      <section className="weekly-weather-section">
        <h2>주간 날씨</h2>
        <div className="weekly-weather-container">
          {fiveDayForecast.map((item, index) => (
            <div key={index} className="daily-weather">
              <p>{new Date(item.dt_txt).toLocaleDateString("ko-KR", {
                weekday: "long",
              })}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="날씨 아이콘"
              />
              <p>{Math.round(item.main.temp - 273.15)}°C</p>
              <p>최고: {item.maxTemp}°C</p>
              <p>최저: {item.minTemp}°C</p>
            </div>
          ))}
        </div>
      </section>

            {/* 의상 추천 */}
            <div className="outfit-recommendations" ref={outfitSectionRef}>
              <h2>오늘의 AI 추천 코디</h2>
              <div className="outfit-grid">
                {outfitRecommendations.map((item, index) => (
                  <div key={index} className="outfit-item">
                    <img src={item.image} alt={item.label} />
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
      <Footer />
    </div>
  );
};

export default WeatherPage;
