import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "./SignupPage.css";
import {Link, useNavigate} from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

import SignupComponent from "../../components/auth/SignupComponent";
import {register} from "../../api/auth";

const SignupPage = () => {
    const navigate = useNavigate();
    const [showZipcodePopup, setShowZipcodePopup] = useState(false);
    const [addressData, setAddressData] = useState({
        zipcode: "",
        address: "",
    });

    const {
        handleSubmit,
        control,
        setValue, // React Hook Form의 setValue로 값을 설정
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async  (data) => {
        data.date_of_birth = new Date(data.date_of_birth).toISOString().split("T")[0];
        const formData = data
        if (data.user_pw !== data.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const result = await register(formData);
            if (result.status === 201) {
                alert("회원가입이 완료되었습니다!");
                navigate("/");
            } else {
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            console.error(error);
        }
    };

    const handleZipcodeSelect = (data) => {
        setAddressData({
            zipcode: data.zonecode,
            address: data.address,
        });

        // React Hook Form의 필드 값 업데이트
        setValue("postal_code", data.zonecode);
        setValue("address", data.address);

        setShowZipcodePopup(false);
    };

    return (
        <div className="signup-container">
            <video autoPlay loop muted className="signup-video">
                <source src="/images/home.mp4" type="video/mp4" />
            </video>
            <div className="form-section">
                <p className="signup-main">Create an Account</p>
                <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                    <SignupComponent
                        control={control}
                        errors={errors}
                        watch={watch}
                        onZipcodePopup={() => setShowZipcodePopup(true)}
                    />
                    <button type="submit" className="form-button">
                        회원가입
                    </button>
                </form>

                {showZipcodePopup && (
                    <div className="zipcode-popup-overlay">
                        <div className="zipcode-popup">
                            <button
                                type="button"
                                onClick={() => setShowZipcodePopup(false)}
                                className="close-popup-button"
                            >
                                닫기
                            </button>
                            <DaumPostcode onComplete={handleZipcodeSelect} />
                        </div>
                    </div>
                )}

                <p className="login-link">
                    Already have an account? <Link to={"/login"}>Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;