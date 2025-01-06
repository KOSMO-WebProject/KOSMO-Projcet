import { Router, Routers } from 'react-router-dom'; // react-router-dom에서 가져와야 합니다.
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPwPage/LoginPage';
import ShopLandingPage from './pages/LandingPage/ShopLandingPage';
import WeatherPage from './pages/weather/WeatherPage';


const App = () => {
  return (
    <Router>
      <Routers>
        <Router path="/" exact={true} element={<HomePage />} />
        <Router path="/login" exact={true} element={<LoginPage />} />
        <Router path="/clothing" exact={true} element={<ShopLandingPage />} />
        <Router path="/weather" exact={true} element={<WeatherPage />} />
      </Routers>
    </Router>
  );
}

export default App;