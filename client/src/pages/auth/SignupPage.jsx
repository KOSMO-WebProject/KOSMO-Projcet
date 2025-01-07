import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "./SignupForm.css";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

import SignupComponent from "../../components/auth/SignupComponent";

const SignupPage = () => {
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

    const onSubmit = (data) => {
        if (data.password !== data.passwordCheck) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Form Submitted:", data);
        alert("회원가입이 완료되었습니다!");
    };

    const handleZipcodeSelect = (data) => {
        setAddressData({
            zipcode: data.zonecode,
            address: data.address,
        });

        // React Hook Form의 필드 값 업데이트
        setValue("zipcode", data.zonecode);
        setValue("address", data.address);

        setShowZipcodePopup(false);
    };

    return (
        <div className="signup-container">
            <video autoPlay loop muted className="signup-video">
                <source src="/images/home.mp4" type="video/mp4" />
            </video>
            <div className="form-section">
                <p className="login-main">Create an Account</p>
                <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                    <SignupComponent
                        control={control}
                        errors={errors}
                        watch={watch}
                        onZipcodePopup={() => setShowZipcodePopup(true)}
                    />
                    <button type="submit" className="form-button">
                        Sign-up
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
