import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKakaoToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if (code) {
                try {
                    // 백엔드에 인증 코드 전달
                    const response = await axios.get(`http://localhost:5000/auth/kakao/callback?code=${code}`);
                    console.log("카카오 로그인 성공:", response.data);
                    // 로그인 성공 후 리다이렉트
                    navigate("/");
                } catch (error) {
                    console.error("카카오 로그인 실패:", error);
                    // 로그인 실패 시 로그인 페이지로 리다이렉트
                    navigate("/login");
                }
            }
        };

        fetchKakaoToken();
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;