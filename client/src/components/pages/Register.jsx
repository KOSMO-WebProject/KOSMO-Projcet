import React, { useEffect, useState } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router';


const Register = () => {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    name: '',
    phoneNumber: '',
    email: '',
    zipCode: '',
    address: '',
    detailAddress:''
  });

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.userid) {
      formIsValid = false;
      errors['userid'] = 'ID를 입력해주세요.';
    }


    if (!formData.password) {
      formIsValid = false;
      errors['password'] = '비밀번호를 입력해주세요';
    }

 
    if (!formData.name) {
      formIsValid = false;
      errors['name'] = '이름을  입력해주세요.';
    }


    if (!formData.phoneNumber) {
      formIsValid = false;
      errors['phoneNumber'] = 'Phone number is required';
    } else if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      formIsValid = false;
      errors['phoneNumber'] = 'Invalid phone number, should be 10-11 digits';
    }

 
    if (!formData.email) {
      formIsValid = false;
      errors['email'] = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors['email'] = '이메일 형식이 아닙니다';
    }

 
    if (!formData.zipCode) {
      formIsValid = false;
      errors['zipCode'] = '우편번호를 입력해주세요.';
    }

    if (!formData.address) {
      formIsValid = false;
      errors['address'] = '도로명주소를 입력해주세요.';
    }

    if (!formData.detailAddress) {
      formIsValid = false;
      errors['detailAddress'] = 'detailAddress is required';
    }

    setErrors(errors);
    return formIsValid;
  };

  


  const nevigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault(); //기본 폼 제출 동작(페이지 새로고침)을 방지한다.
    if (validateForm()) {
      console.log('Form data:', formData);
      try{
        axios.post('/auth/register',formData)
        alert('회원가입이 완료되었습니다.');
        nevigate("/")
      }
      catch(err){
        console.log(err)
      }

    }
  };

  // Daum Postcode 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);


   // Daum 우편번호 팝업 호출
const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수
  
        // 주소 타입에 따라 주소 값 설정
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress; // 도로명 주소
        } else {
          addr = data.jibunAddress; // 지번 주소
        }
  
        // 참고항목 설정
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        }
  
        // 상태 업데이트: 기존 상태를 유지하며 새로운 데이터만 추가
        setFormData(prev => ({
          ...prev,
          zipCode: data.zonecode,
          address: addr,
        }));
      },
    }).open();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="register-container">
      <h1>회원가입</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" name="userid" value={formData.userid} onChange={handleChange} />
          {errors.userid && <p className="error-message">{errors.userid}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
            <label>우편번호:</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
          {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}
          <button type="button" onClick={handleAddressSearch}>주소 검색</button>
        </div>
        <div>
        <div>
          <label>도로명주소:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        <div>
            <label>상세주소</label>
            <input
            type="text"
            name="detailAddress"
            placeholder="상세주소"
            value={formData.detailAddress}
            onChange={handleChange}
            />
            {errors.detailAddress && <p className="error-message">{errors.detailAddress}</p>}
        </div>
        </div>
        <button className="submit-button" type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
