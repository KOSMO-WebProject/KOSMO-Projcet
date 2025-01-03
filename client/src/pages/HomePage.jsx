import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  const [location, setLocation] = useState({ lat: 37.5664056, lon: 126.9778222 }); //기본주소는 서울시청으로 설정
  const [citys,setCitys] = useState([])
  const [weather,setWeather] = useState([])

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation({ lat, lon });
    });
  };

  // useEffect(()=>{
  //   getCurrentLocation();
  //   const { lat, lon } = location;
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATEHER_API_KEY}`)
  //   .then(res=>setWeather(res.data))
  // },[])

  useEffect(()=>{
    
  },[])

  useEffect(() => {
    const { lat, lon } = location;
    if (lat && lon) {
      axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`, {
        headers: {
          'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}` 
        }
      })
      .then(res => res.data.documents[0].address)
      .then(data=> setCitys(data))
      .catch(err => console.error('API 요청 중 오류 발생:', err));
    }
  }, [location]); // location 상태가 변경될 때마다 이 useEffect 실행
  console.log(citys)
  console.log(weather)
  const temperature = weather.main ? Math.round(weather.main.temp - 273.15) : "날씨정보를 가져올 수 없습니다"; // 섭씨 온도 계산 및 반올림

  return (
    <div>
      <Header/>
        <div>
          {citys.address_name}
        </div>
        <div>
          {citys.region_1depth_name} {citys.region_2depth_name} {citys.region_3depth_name}
          의 날씨는 
          <span>{temperature}°C</span>
        </div>
        <Footer/>
    </div>
  );
}


export default HomePage;
