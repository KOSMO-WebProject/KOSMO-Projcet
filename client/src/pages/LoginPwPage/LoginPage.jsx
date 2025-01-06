import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { login } from '../../redux/slice/authSlice';
import './LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      // 로그인 액션에서 email 사용
      await dispatch(login({ email, password })).unwrap();
      console.log('Login successful');
      navigate('/'); // 로그인 성공 시 이동할 경로 설정
    } catch (err) {
      console.error('Login failed:', err); // 수정: error -> err
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`${platform} login clicked`);
    // Add social login redirection logic here
  };

  return (
    <div className="login-container">
      <h1 onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" />
      </h1>
      <p>로그인을 해주세요</p>
      <main className="login-main">
        <form className='login-form' onSubmit={(e) => e.preventDefault()}>
          <input
            className='input'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
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
