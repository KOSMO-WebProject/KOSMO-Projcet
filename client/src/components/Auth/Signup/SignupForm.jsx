import React from 'react';
import './SignupForm.css';

const SignupForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault(); // 기본 동작 방지
      console.log('Form submitted!');
    };
  return (
    <div className="signup-container">
    <video autoPlay loop muted className="signup-video">
    <source src="/images/home.mp4" type="video/mp4" />
    </video>
      <div className="form-section">
        <h1>Create an Account</h1>
        <p>Are you ready to join our community? Please fill out the form below!</p>
        <form className="signup-form">
            <input type="text" placeholder="Full Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <input type="text" placeholder="ID" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <input type="password" placeholder="Password check" className="form-input" />
            <input type="date" placeholder="Birthday" className="form-input" />
            <select className="form-input" defaultValue="">
            <option value="" disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>
            <input type="text" placeholder="Phone Number" className="form-input" />
            <input type="text" placeholder="Address" className="form-input" />
            <button type="submit" className="form-button">Sign-up</button>
            <button type="button" className="form-button alternative">Log in with KAKAO</button>
            <button type="button" className="form-button alternative">Log in with NAVER</button>
        </form>
        <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
        </div>
    </div>
    );
};

export default SignupForm;
