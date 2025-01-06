// src/components/Auth/Signup/SignupForm.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
import "react-calendar/dist/Calendar.css";
import './SignupForm.css';
import ZipcodeSearch from '../../zipcode/ZipcodeSearch';
import {
    updateName, updateEmail, updateId, updateAddress, 
    updateBirthDate, updateGender, updatePhoneNumber
} from '../../../redux/signupSlice';

const SignupForm = () => {
    const dispatch = useDispatch();
    const { name, email, id, address, birthDate, gender, phoneNumber } = useSelector((state) => state.signup);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = React.useState(false);
    const [showZipcodePopup, setShowZipcodePopup] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!', { name, email, id, address, birthDate, gender, phoneNumber });
        // Optionally, dispatch an action for form submission
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
                        placeholder="Full Name"
                        className="form-input"
                        value={name}
                        onChange={(e) => dispatch(updateName(e.target.value))} // Dispatch name
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-input"
                        value={email}
                        onChange={(e) => dispatch(updateEmail(e.target.value))} // Dispatch email
                    />
                    <input
                        type="text"
                        placeholder="ID"
                        className="form-input"
                        value={id}
                        onChange={(e) => dispatch(updateId(e.target.value))} // Dispatch ID
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="form-input"
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
                            placeholder="Password check"
                            className="form-input"
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
                                placeholder="Birthday"
                                className="form-input date-input"
                                value={birthDate}
                                onChange={(e) => dispatch(updateBirthDate(e.target.value))} // Dispatch birthdate
                            />
                        </div>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="Gender" className="form-label">성별</label>
                        <select
                            id="Gender"
                            value={gender}
                            onChange={(e) => dispatch(updateGender(e.target.value))} // Dispatch gender
                            className="form-input"
                        >
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="PhoneNumber" className="form-label">전화번호</label>
                        <input
                            placeholder="xxx-xxxx-xxxx"
                            className="form-input"
                            value={phoneNumber}
                            onChange={(e) => dispatch(updatePhoneNumber(e.target.value))} // Dispatch phone number
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="Address" className="form-label">주소</label>
                        <div className="address-input-wrapper">
                            <input
                                placeholder="Address"
                                value={address}
                                readOnly
                                className="form-input address-input"
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
                    <button type="button" className="form-button KAKAO">signup with KAKAO</button>
                    <button type="button" className="form-button NAVER">signup with NAVER</button>
                    {showZipcodePopup && (
                        <div className="zipcode-popup-overlay">
                            <ZipcodeSearch
                                onClose={() => setShowZipcodePopup(false)}
                                onAddressSelect={(selectedAddress) => {
                                    dispatch(updateAddress(selectedAddress)); // Dispatch updated address
                                    setShowZipcodePopup(false);
                                }}
                            />
                        </div>
                    )}
                </form>

                <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
            </div>
        </div>
    );
};

export default SignupForm;
