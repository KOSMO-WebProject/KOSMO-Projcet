import { Route, Routes } from 'react-router-dom'; // react-router-dom에서 가져와야 합니다.
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPwPage/LoginPage';
import ShopLandingPage from './pages/LandingPage/ShopLandingPage';
import WeatherPage from './pages/weather/WeatherPage';
import KakaoCallback from './pages/LoginPwPage/KaKaoCallback';
import NaverCallback from './pages/LoginPwPage/NaverCallback';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/login" exact={true} element={<LoginPage />} />
        <Route path="/clothing" exact={true} element={<ShopLandingPage />} />
        <Route path="/weather" exact={true} element={<WeatherPage />} />
        <Route path="/auth/kakao/login" element={<KakaoCallback />} />
        <Route path="/auth/naver/login" element={<NaverCallback />} />
      </Routes>
    </>
  );
}

export default App;