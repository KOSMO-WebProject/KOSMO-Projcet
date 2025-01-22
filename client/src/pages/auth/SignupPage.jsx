import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import "react-calendar/dist/Calendar.css";
import './SignupPage.css';
import ZipcodeSearch from '../auth/zipcode/ZipcodeSearch';
import {
    updateName, updateEmail, updateId, updateAddress, updateDetailAddress, updatePassword,
    updateBirthDate, updateGender, updatePhoneNumber,
} from '../../redux/slice/signupSlice';

const SignupPage = () => {
    const dispatch = useDispatch();
    const { name, email, id, address, birthDate, gender, phoneNumber, detailAddress, password } = useSelector((state) => state.signup);
    const [passwordCheck, setPasswordCheck] = React.useState('');  // 패스워드 체크 상태
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = React.useState(false);
    const [showZipcodePopup, setShowZipcodePopup] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id,email,password,name,phoneNumber);
        try {
            const response = await axios.post('/auth/register', {
                user_id: id,  // 백엔드에서 user_name으로 처리됨
                email,
                password,
                date_of_birth:birthDate,
                nickname: name,  // 백엔드에서 nickname으로 처리됨
                gender : gender,
                phone_number: phoneNumber,  // 백엔드에서 phonenumber으로 처리됨
                postal_code: address.zipCode,  // 백엔드에서 zipcode으로 처리됨
                address: address.fullAddress,  // 백엔드에서 address로 처리됨
                detailed_address: detailAddress,  // 백엔드에서 detailAddress로 처리됨
            });
            console.log('회원가입 성공:', response.data);
        } catch (error) {
            console.error('회원가입 실패:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 409) {
                alert('이미 존재하는 사용자입니다!');
            } else {
                alert('회원가입에 실패했습니다!');
            }
        }
    }

    return (
        <div className="signup-container">
            <video autoPlay loop muted className="signup-video">
                <source src="/images/home.mp4" type="video/mp4" />
            </video>
            <div className="form-section">
                <p className="signup-main">Create an Account</p>
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
                            value={password}
                            onChange={(e) => dispatch(updatePassword(e.target.value))} // Dispatch Password
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
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)} // Dispatch Password
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
                            placeholder="xxxxxxxxxxx"
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
                        <input
                            placeholder="상세주소"
                            value={detailAddress}  // 상세주소는 detailAddress로 상태 관리
                            onChange={(e) => updateDetailAddress(e.target.value)}  // 상세주소 입력 시 상태 업데이트
                            className="form-input detail-address-input"
                        />
                    </div>

                    <button type="submit" className="form-button">Sign-up</button>
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

export default SignupPage;

