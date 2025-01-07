import React, { useState } from "react";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";

const SignupComponent = ({ control, errors, watch, onZipcodePopup }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    return (
        <>
            {/* Full Name */}
            <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{ required: "이름은 필수 입력 항목입니다." }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="이름을 입력해주세요"
                        className="form-input"
                    />
                )}
            />
            {errors.fullName && <p className="error">{errors.fullName.message}</p>}

            {/* Nickname */}
            <Controller
                name="nickname"
                control={control}
                defaultValue=""
                rules={{ required: "닉네임은 필수 입력 항목입니다." }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        className="form-input"
                    />
                )}
            />
            {errors.nickname && <p className="error">{errors.nickname.message}</p>}

            {/* Email */}
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                    required: "이메일은 필수 입력 항목입니다.",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "유효한 이메일 주소를 입력해주세요.",
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        className="form-input"
                    />
                )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            {/* Password */}
            <div className="password-input-container">
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "비밀번호는 필수 입력 항목입니다." }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력해주세요"
                            className="form-input"
                        />
                    )}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}

            {/* Birthday with React-datepicker */}
            <Controller
                name="birthday"
                control={control}
                defaultValue={null} // React-datepicker uses null for empty values
                rules={{ required: "생년월일을 선택해주세요." }}
                render={({ field }) => (
                    <ReactDatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-input"
                        placeholderText="생년월일을 선택해주세요"
                    />
                )}
            />
            {errors.birthday && <p className="error">{errors.birthday.message}</p>}

            {/* Gender */}
            <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <select {...field} className="form-input">
                        <option value="" disabled>
                            성별 선택
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                )}
            />

            {/* Address */}
            <Controller
                name="zipcode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <div className="zipcode-input-wrapper">
                        <input
                            {...field}
                            type="text"
                            placeholder="우편번호"
                            className="form-input"
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={onZipcodePopup}
                            className="address-search-button"
                        >
                            주소검색
                        </button>
                    </div>
                )}
            />

            <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="주소"
                        className="form-input"
                        readOnly
                    />
                )}
            />

            <Controller
                name="detailAddress"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="상세 주소"
                        className="form-input"
                    />
                )}
            />
        </>
    );
};

export default SignupComponent;
