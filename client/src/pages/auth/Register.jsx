import React, { useEffect, useState } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router';


const Register = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    user_name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    gender: '',
    recipient_name: '',
    postal_code: '',
    address: '',
    detailed_address: '',
    is_default: false
  });

  const [errors, setErrors] = useState({});
  const nav = useNavigate()

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.user_id) {
      formIsValid = false;
      errors['user_id'] = 'ID를 입력해주세요.';
    }
    if (!formData.user_pw) {
      formIsValid = false;
      errors['user_pw'] = '비밀번호를 입력해주세요.';
    }
    if (!formData.user_name) {
      formIsValid = false;
      errors['user_name'] = '이름을 입력해주세요.';
    }
    if (!formData.phone_number) {
      formIsValid = false;
      errors['phone_number'] = '전화번호를 입력해주세요.';
    } else if (!/^\d{10,11}$/.test(formData.phone_number)) {
      formIsValid = false;
      errors['phone_number'] = '전화번호는 10-11자리 숫자여야 합니다.';
    }
    if (!formData.email) {
      formIsValid = false;
      errors['email'] = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors['email'] = '유효한 이메일 형식이 아닙니다.';
    }
    if (!formData.date_of_birth) {
      formIsValid = false;
      errors['date_of_birth'] = '생년월일을 입력해주세요.';
    }
    if (!formData.gender) {
      formIsValid = false;
      errors['gender'] = '성별을 선택해주세요.';
    }
    if (!formData.recipient_name) {
      formIsValid = false;
      errors['recipient_name'] = '수령인을 입력해주세요.';
    }
    if (!formData.postal_code) {
      formIsValid = false;
      errors['postal_code'] = '우편번호를 입력해주세요.';
    }
    if (!formData.address) {
      formIsValid = false;
      errors['address'] = '주소를 입력해주세요.';
    }
    if (!formData.detailed_address) {
      formIsValid = false;
      errors['detailed_address'] = '상세주소를 입력해주세요.';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //기본 폼 제출 동작(페이지 새로고침)을 방지한다.
    if (validateForm()) {
      // console.log('Form data:', formData);
      try {
        await axios.post('/auth/register', formData)
        alert('회원가입이 완료되었습니다.');
        nav("/")
      }
      catch (err) {
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
          postal_code: data.zonecode,
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
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} />
          {errors.user_id && <p className="error-message">{errors.user_id}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="user_pw" value={formData.user_pw} onChange={handleChange} />
          {errors.user_pw && <p className="error-message">{errors.user_pw}</p>}
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
          {errors.user_name && <p className="error-message">{errors.user_name}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          {errors.phone_number && <p className="error-message">{errors.phone_number}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <label>우편번호:</label>
          <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
          {errors.postal_code && <p className="error-message">{errors.postal_code}</p>}
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
              name="detailed_address"
              placeholder="상세주소"
              value={formData.detailed_address}
              onChange={handleChange}
            />
            {errors.detailed_address && <p className="error-message">{errors.detailed_address}</p>}
          </div>
        </div>
        <button className="submit-button" type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
