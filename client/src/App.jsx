<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/Auth/Signup/SignupForm';
import LoginForm from './components/Auth/Login/LoginForm';

function App() {
=======
import { Route, Routes } from 'react-router-dom'; // react-router-dom에서 가져와야 합니다.
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPwPage/LoginPage';
import ShopLandingPage from './pages/LandingPage/ShopLandingPage';
import WeatherPage from './pages/weather/WeatherPage';


const App = () => {
>>>>>>> develop
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
=======
          <Route path="/" exact ={true} element={<HomePage />}/>
          <Route path="/login" exact ={true} element={<LoginPage />}/>
          <Route path="/clothing" exact ={true} element={<ShopLandingPage />}/>
          <Route path="/weather" exact ={true} element={<WeatherPage />}/>
>>>>>>> develop
      </Routes>
    </Router>
  );
}

export default App;