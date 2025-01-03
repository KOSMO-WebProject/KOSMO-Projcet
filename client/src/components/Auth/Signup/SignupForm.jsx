import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
import "react-calendar/dist/Calendar.css";
import './SignupForm.css';
import ZipcodeSearch from '../../zipcode/ZipcodeSearch'

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [birthDateSelected, setBirthDateSelected] = useState(false); //생년월일 선택
    const [genderSelected, setGenderSelected] = useState(false); //성별 선택
    const [showZipcodePopup, setShowZipcodePopup] = useState(false); // 팝업 상태
    const [address, setAddress] = useState(''); // 주소 상태 추가

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted!');
    };

    const handleDateChange = (e) => {
        setBirthDateSelected(!!e.target.value); // 생년월일 선택 상태 업데이트
    };

    const handleGenderChange = (e) => {
        setGenderSelected(!!e.target.value); // 성별 선택 상태 업데이트
    };

    return (
        <div className="signup-container">
            <video autoPlay loop muted className="signup-video">
                <source src="/images/home.mp4" type="video/mp4" />
            </video>
            <div className="form-section">
                <p className="login-main">Create an Account </p>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" className="form-input" />
                    <input type="email" placeholder="Email" className="form-input" />
                    <input type="text" placeholder="ID" className="form-input" />
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
                                onChange={handleDateChange} // 생년월일 상태 업데이트
                                style={{
                                    color: birthDateSelected ? "black" : "gray", // 색상 동적 변경
                                }}
                            />
                        </div>                        
                    </div>

                    <div className="form-input-container">
                        <label htmlFor="Gender" className="form-label">성별</label>
                        <select 
                            id="Gender" 
                            className="form-input" 
                            defaultValue="" 
                            onChange={handleGenderChange} // 성별 선택 상태 업데이트
                            style={{
                                color: genderSelected ? "black" : "gray", // 색상 동적 변경
                            }}
                        >
                            <option value="" disabled style={{ color: "gray" }}>Gender</option>
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
                        />
                        
                    </div>

                    <div className="form-input-container">
                        <label htmlFor="Address" className="form-label">주소</label>
                        <div className="address-input-wrapper">
                            <input 
                                placeholder="Address" 
                                className="form-input address-input" 
                                value={address} // 주소 상태를 입력 필드 값으로 사용
                                readOnly // 읽기 전용 설정
                            />
                            <button 
                                type="button" 
                                className="address-search-button" 
                                onClick={() => setShowZipcodePopup(true)}
                            >
                                <FaSearch className="address-search-icon" />
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="form-button">Sign-up</button>
                    <button type="button" className="form-button KAKAO">signup with KAKAO</button>
                    <button type="button" className="form-button NAVER">signup with NAVER</button>
                </form>
                <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
            </div>
            {/* 팝업 조건부 렌더링 */}
            {showZipcodePopup && (
                <div className="zipcode-popup-overlay">
                    <ZipcodeSearch 
                        onClose={() => setShowZipcodePopup(false)} // 팝업 닫기 핸들러
                        onAddressSelect={(selectedAddress) => {
                            setAddress(selectedAddress); // 주소 설정
                            setShowZipcodePopup(false); // 팝업 닫기
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

export default SignupForm;
