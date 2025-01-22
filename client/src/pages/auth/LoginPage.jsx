import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { login } from '../../redux/slice/authSlice';
import './LoginPage.css'
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 로그인 처리 함수
    const handleLogin = async () => {
        try {
            // 로그인 액션에서 email 사용
            const response = await dispatch(login({ user_id :email, password })).unwrap();
            if(response.user_no) {
                alert('로그인 성공');
                navigate('/');
            }

        } catch (err) {
            console.error('Login failed:', err);
            alert('아이디 또는 비밀번호가 틀렸습니다.');
            return;
        }
    };

    const handleSocialLogin = (platform) => {
        console.log(`${platform} login clicked`);

        if (platform === 'Kakao') {
            // 서버의 카카오 로그인 엔드포인트로 요청
            window.location.href = 'http://localhost:5000/auth/kakao/login';
        }
        else if (platform === 'Naver') {
            // 서버의 네이버 로그인 엔드포인트로 요청
            window.location.href = 'http://localhost:5000/auth/naver/login';
        }
        else {
            console.log(`${platform} login clicked`);
        }
    };

    return (
        <div className="login-container">
            <h1 onClick={() => navigate('/')}>
                <img src={logo} alt="Logo" />
            </h1>
            <p>로그인을 해주세요</p>
            <main className="login-main">
                <form className='login-form' onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <input
                        className='input'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ID"
                    />
                    <input
                        className='input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className='btn black'
                        type="submit"
                    >
                        로그인
                    </button>
                </form>
                <div className="social-login">
                    <button className="btn kakao" onClick={() => handleSocialLogin('Kakao')}>카카오 로그인</button>
                    <button className="btn naver" onClick={() => handleSocialLogin('Naver')}>네이버 로그인</button>
                </div>
            </main>
            <div className="additional-links">
                <button onClick={() => navigate('/signup')}>회원가입</button>
                <button onClick={() => navigate('/find-email')}>이메일 찾기</button>
                <button onClick={() => navigate('/find-password')}>비밀번호 찾기</button>
            </div>
        </div>
    );
};

export default LoginPage;