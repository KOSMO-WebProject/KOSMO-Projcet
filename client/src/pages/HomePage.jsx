import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextImage, prevImage } from '../redux/slice/homepageSlice';
import axios from 'axios';
import weatherImage from '../assets/banner-image.jpg';
import Header from '../components/includes/Header';
import Footer from '../components/includes/Footer';
import { useNavigate } from 'react-router-dom';  // useNavigate import
import './HomePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const [location, setLocation] = useState({ lat: 37.5664056, lon: 126.9778222 });
  const [citys, setCitys] = useState([]);
  const [weather, setWeather] = useState([]);
  const dispatch = useDispatch();
  const { images, currentImageIndex } = useSelector(state => state.homepage);
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 날씨 및 위치 정보 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation({ lat, lon });
    }, (error) => {
      console.error('Geolocation error:', error);
    });
  };

  useEffect(() => {
    getCurrentLocation();
    const { lat, lon } = location;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATEHER_API_KEY}`)
      .then(res => setWeather(res.data))
      .catch(err => console.error('날씨 API 요청 중 오류 발생:', err));
  }, [location]);

  useEffect(() => {
    const { lat, lon } = location;
    if (lat && lon) {
      axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`, {
        headers: {
          'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`
        }
      })
      .then(res => res.data.documents[0].address)
      .then(data => setCitys(data))
      .catch(err => console.error('API 요청 중 오류 발생:', err));
    }
  }, [location]);

  const temperature = weather.main ? Math.round(weather.main.temp - 273.15) : "날씨정보를 가져올 수 없습니다";
  const weatherIcon = weather?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : null;

  // AI 추천 버튼 클릭 시 /weather 페이지로 이동
  const handleWeatherPage = () => {
    navigate('/weather');  // navigate 훅으로 페이지 이동
  };

  return (
    <div className="homepage">
      <Header />

      {/* 날씨 섹션 */}
      <section className="weather-section">
        <div className="weather-content">
          <div className="weather-image">
            <img src={weatherImage} alt="Weather" />
          </div>
          <div className="weather-details">
            <div className="weather-icon-container">
              {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />}
            </div>
            <div className="weather-info">
              <h1>오늘의 날씨</h1>
              <p className="temperature">{temperature}°C</p>
              <p className="feels-like">체감(-0.2°C)</p>
              <button className="ai-recommendation" onClick={handleWeatherPage}>AI 기반 옷 추천 보기</button>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="category-section">
        <div className="category-container">
          {/* 왼쪽 버튼 */}
          <div className="category-buttons">
            <button onClick={() => window.location.href = '/productlist'}>
              <i className="bi bi-brightness-high"></i> 계절에 맞는 옷 아이템
            </button>
            <button onClick={() => window.location.href = '/productlist'}>
              <i className="bi bi-handbag"></i> 가방
            </button>
            <button onClick={() => window.location.href = '/productlist'}>
              <i className="bi bi-box"></i> 상의
            </button>
            <button onClick={() => window.location.href = '/productlist'}>
              <i className="bi bi-box"></i> 하의
            </button>
            <button onClick={() => window.location.href = '/productlist'}>
              <i className="bi bi-gem"></i> 액세서리
            </button>
          </div>

          {/* 오른쪽 폴라로이드 보드 */}
          <div className="polaroid-board">
            <div className="polaroid-image">
              <img src="https://image.msscdn.net/thumbnails/images/goods_img/20241129/4643315/4643315_17328581053331_500.jpg?w=780" alt="폴라로이드 이미지" />
            </div>
            <div className="polaroid-caption">
              <p>최신 트렌드 아이템</p>
            </div>
          </div>
        </div>
      </section>

      {/* 이미지 배너 섹션 */}
      <section className="banner-section">
        <div className="image-slider">
          <button className="slider-button left" onClick={() => dispatch(prevImage())}>◀</button>
          <div className="banner-container">
            <div
              className="banner-image"
              style={{
                backgroundImage: `url('${images[currentImageIndex]}')`,
              }}
            />
          </div>
          <button className="slider-button right" onClick={() => dispatch(nextImage())}>▶</button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
