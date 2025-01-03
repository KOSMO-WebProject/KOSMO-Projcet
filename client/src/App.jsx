import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/Auth/Signup/SignupForm';
import LoginForm from './components/Auth/Login/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;