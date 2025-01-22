import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Mypage.css";
import Header from "../../components/includes/Header";

const Mypage = () => {
  const [user, setUser] = useState(null); // 유저 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();

  useEffect(() => {
    // MySQL에서 데이터 가져오기
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user", {
          withCredentials: true, // 로그인 세션을 함께 보냄
        });
        setUser(response.data); // 유저 데이터 설정
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login"); // 로그인 실패 시 로그인 페이지로 이동
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중 상태 표시
  }

  if (!user) {
    return <p>유저 정보를 불러오지 못했습니다.</p>;
  }

  return (
      <div className="mypage-container">
        <Header />        
      <div className="profile">
        <div className="profile-picture"></div>
        <div className="profile-info">
          <h2>{user.name || "xxx님"}</h2>
          <div className="profile-details">
            <p>ID: {user.id || "John Doe"}</p>
            <p>PW: ********</p>
            <p>Email: {user.email || "email@gmail.com"}</p>
            <p>Number: {user.phone || "xxx-xxxx-xxxx"}</p>
            <p>Address: {user.address || "서울특별시 금천구 가산동 549-1"}</p>
          </div>
        </div>
      </div>

      <div className="purchase-history">
        <h3>구매 내역</h3>
        <div className="purchase-list">
          {user.purchases && user.purchases.length > 0 ? (
            user.purchases.map((item, index) => (
              <div key={index} className="purchase-item">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name || "상품 이미지"}
                  className="item-image"
                />
                <div className="item-details">
                  <p className="item-name">{item.name || "상품 이름"}</p>
                  <div className="btn-container">
                    <button className="btn">배송 조회</button>
                    <button className="btn">재구매</button>
                    <button className="btn">후기 작성</button> {/* 후기 작성 버튼 추가 */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>구매 내역이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
