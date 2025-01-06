<<<<<<< HEAD
// Component for rendering the login form UI
=======
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../../redux/actions';  // 경로 수정

const LoginForm = () => {
    // 리덕스 상태에서 이메일과 비밀번호를 가져오기
    const email = useSelector((state) => state.email);  // email을 리덕스 상태에서 가져옴
    const password = useSelector((state) => state.password);  // password를 리덕스 상태에서 가져옴
    const dispatch = useDispatch();

    // 로그인 처리 함수
    const handleLogin = () => {
        console.log('Logging in...');
        console.log('Email:', email);
        console.log('Password:', password);
    };

    // 이메일 입력값 변경 핸들러
    const handleEmailChange = (event) => {
        dispatch(setEmail(event.target.value));
    };

    // 비밀번호 입력값 변경 핸들러
    const handlePasswordChange = (event) => {
        dispatch(setPassword(event.target.value));
    };

    return (
        <form className='login-form'>
            <input className='input'
                type="email" 
                value={email} 
                onChange={handleEmailChange} 
                placeholder="Email"
            />
            <input className='input'
                type="password" 
                value={password} 
                onChange={handlePasswordChange} 
                placeholder="Password"
            />
            <button className='btn black' type="button" onClick={handleLogin}>로그인</button>
            </form>
        );
    };

export default LoginForm;
>>>>>>> develop
