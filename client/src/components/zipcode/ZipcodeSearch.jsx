// src/zipcode/ZipcodeSearch.jsx
import React from 'react';
import DaumPostcode from 'react-daum-postcode'; // DaumPostcode 컴포넌트 임포트
import './ZipcodeSearch.css'; // CSS 스타일 임포트
import { useDispatch } from 'react-redux'; // Dispatch를 사용하기 위해 import
import { updateAddress } from '../../redux/signupSlice'; // 리덕트 액션 임포트

const ZipcodeSearch = ({ onClose }) => {
    const dispatch = useDispatch(); // Dispatch 함수 사용

    const handleComplete = (data) => {
        const { address } = data; // 선택된 주소 가져오기
        dispatch(updateAddress(address)); // 리덕트 상태에 주소 업데이트
        onClose(); // 부모 컴포넌트에서 전달된 onClose 함수 호출
    };

    return (
        <div className="zipcode-popup">
            <div className="zipcode-popup-content">
                <button className="zipcode-close-button" onClick={onClose}>X</button>
                <h2>주소 검색</h2>
                <DaumPostcode onComplete={handleComplete} /> {/* 주소 검색 컴포넌트 */}
            </div>
        </div>
    );
};

export default ZipcodeSearch;
