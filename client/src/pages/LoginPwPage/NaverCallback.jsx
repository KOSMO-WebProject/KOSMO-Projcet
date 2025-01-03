import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (code && state) {
      fetch(`http://localhost:5000/auth/naver/callback?code=${code}&state=${state}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            console.log("네이버 로그인 성공:", data.user);
            localStorage.setItem("token", data.token);
            navigate("/"); // 성공 시 메인 페이지로 이동
          } else {
            console.error("네이버 로그인 실패");
            navigate("/login"); // 실패 시 로그인 페이지로 이동
          }
        })
        .catch((error) => {
          console.error("네이버 로그인 에러:", error);
          navigate("/login");
        });
    } else {
      console.error("Authorization code or state not found");
      navigate("/login");
    }
  }, [navigate]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;