import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import './ZipcodeSearch.css';

const ZipcodeSearch = ({ onClose, onAddressSelect }) => {
    const handleComplete = (data) => {
        const { address } = data;
        onAddressSelect(address); // 선택된 주소를 부모 컴포넌트로 전달
    };

    return (
        <div className="zipcode-popup">
            <div className="zipcode-popup-content">
                <button className="zipcode-close-button" onClick={onClose}>X</button>
                <h2>주소 검색</h2>
                <DaumPostcode onComplete={handleComplete} />
            </div>
        </div>
    );
};

export default ZipcodeSearch;
