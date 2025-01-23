import React, { useState } from "react";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupComponent = ({ control, errors, watch, onZipcodePopup }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    return (
        <>
            {/* Full Name */}
            <Controller
                name="user_name"
                control={control}
                defaultValue=""
                rules={{ required: "이름은 필수 입력 항목입니다." }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="Full Name"
                        className="form-input"
                    />
                )}
            />
            {errors.fullName && <p className="error">{errors.fullName.message}</p>}

            {/* Nickname */}
            <Controller
                name="nick_name"
                control={control}
                defaultValue=""
                rules={{ required: "닉네임은 필수 입력 항목입니다." }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="Nickname"
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
                        placeholder="Email"
                        className="form-input"
                    />
                )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            {/* User ID */}
            <Controller
                name="user_id"
                control={control}
                defaultValue=""
                rules={{
                    required: "아이디는 필수 입력 항목입니다.",
                    pattern: {
                        value: /^[a-zA-Z0-9_]{4,20}$/, // 4~20자의 영문, 숫자, 밑줄만 허용
                        message: "아이디는 4~20자의 영문, 숫자, 밑줄만 가능합니다.",
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="ID"
                        className="form-input"
                    />
                )}
            />
            {errors.user_id && <p className="error">{errors.user_id.message}</p>}

            {/* Password */}
            <div className="password-input-container">
                <Controller
                    name="user_pw"
                    control={control}
                    defaultValue=""
                    rules={{ required: "비밀번호는 필수 입력 항목입니다." }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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

            {/* Password Check */}
            <div className="password-input-container">
                <Controller
                    name="passwordCheck"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "비밀번호 확인은 필수 입력 항목입니다.",
                        validate: (value) =>
                            value === watch("user_pw") || "비밀번호가 일치하지 않습니다.",
                    }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type={showPasswordCheck ? "text" : "password"}
                            placeholder="Password check"
                            className="form-input"
                        />
                    )}
                />
                <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="password-toggle"
                >
                    {showPasswordCheck ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            {errors.passwordCheck && <p className="error">{errors.passwordCheck.message}</p>}

            {/* Birthday with React-datepicker */}
            <Controller
                name="date_of_birth"
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

            {/* Phone Number */}
            <Controller
                name="phone_number"
                control={control}
                defaultValue=""
                rules={{
                    required: "전화번호는 필수 입력 항목입니다.",
                    pattern: {
                        value: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                        message: "유효한 전화번호를 입력해주세요. (예: 010-1234-5678)",
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="전화번호 (예: 010-1234-5678)"
                        className="form-input"
                    />
                )}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}

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
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                        <option value="other">기타</option>
                    </select>
                )}
            />

            {/* Address */}
            <Controller
                name="postal_code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <div className="zipcode-input-wrapper">
                        <button
                            type="button"
                            onClick={onZipcodePopup}
                            className="address-search-button"
                            aria-label="주소 검색"
                            >
                                주소검색
                        </button>
                        <input
                            {...field}
                            type="text"
                            placeholder="우편번호"
                            className="form-input address-input"
                            readOnly
                        />
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
                name="detailed_address"
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