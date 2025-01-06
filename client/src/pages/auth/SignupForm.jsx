// src/components/Auth/Signup/SignupForm.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
import "react-calendar/dist/Calendar.css";
import './SignupForm.css';
import {Link} from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        userId: '',
        password: '',
        passwordCheck: '',
        birthday: '',
        gender: '',
        phoneNumber: '',
        address: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [showZipcodePopup, setShowZipcodePopup] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.userId || !formData.password) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (formData.password !== formData.passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        console.log('회원가입 데이터:', formData);
        alert('회원가입이 완료되었습니다!');
    };

    return (
        <div className="signup-container">
            <video autoPlay loop muted className="signup-video">
                <source src="/images/home.mp4" type="video/mp4" />
            </video>
            <div className="form-section">
                <p className="login-main">Create an Account</p>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="form-input"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="userId"
                        placeholder="ID"
                        className="form-input"
                        value={formData.userId}
                        onChange={handleInputChange}
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="password-input-container">
                        <input
                            type={showPasswordCheck ? "text" : "password"}
                            name="passwordCheck"
                            placeholder="Password check"
                            className="form-input"
                            value={formData.passwordCheck}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                            className="password-toggle"
                        >
                            {showPasswordCheck ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="birthday" className="form-label">생년월일</label>
                        <div className="date-input-wrapper">
                            <input
                                id="birthday"
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                className="form-input date-input"
                                value={formData.birthday}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="gender" className="form-label">성별</label>
                        <select
                            id="gender"
                            name="gender"
                            className="form-input"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="phoneNumber" className="form-label">전화번호</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="xxx-xxxx-xxxx"
                            className="form-input"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="address" className="form-label">주소</label>
                        <div className="address-input-wrapper">
                            <input
                                id="address"
                                name="address"
                                placeholder="Address"
                                className="form-input address-input"
                                value={formData.address}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => setShowZipcodePopup(true)}
                                className="address-search-button"
                            >
                                <FaSearch className="address-search-icon" />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="form-button">Sign-up</button>
                    {showZipcodePopup && (
                        <div className="zipcode-popup-overlay">
                            {/* Zipcode Search Modal Content Here */}
                        </div>
                    )}
                </form>
                <p className="login-link">Already have an account? <Link to={"/login"}>Log in</Link></p>
            </div>
        </div>
    );
};

export default SignupForm;
