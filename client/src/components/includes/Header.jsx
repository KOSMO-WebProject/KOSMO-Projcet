import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { colors } from "@mui/material";
// import Sidebar from './SideBar'; // Sidebar 임포트

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 상태

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState); // 상태 반전
    console.log("Search Open:", !isSearchOpen); // 상태 변화 확인
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="left-section">
            <button className="menu-button" onClick={toggleSidebar}>
              ☰
            </button>
            <Link to="/">
              <img src={logo} alt="WWW" className="logo" />
            </Link>
            <nav className="navigation">
              <Link to="/weather" className="H-nav-link">
                날씨
              </Link>
              <Link to="/clothing" className="H-nav-link">
                의류
              </Link>
              <Link to="/backpack" className="H-nav-link">
                가방
              </Link>
              <Link to="/" className="H-nav-link">
                액세서리
              </Link>
              <Link to="/notice/center" className="H-nav-link">
                고객센터
              </Link>
            </nav>
          </div>
          <div className="right-section">
            {/* 돋보기 아이콘 */}
            <i
              className={`fa-solid fa-magnifying-glass search-icon ${
                isSearchOpen ? "active" : ""
              }`}
              onClick={toggleSearch}
            ></i>

            {/* 검색 입력창 */}
            <div
              className={`search-input-container ${isSearchOpen ? "open" : ""}`}
            >
              <input
                type="search"
                className="search-input"
                placeholder="검색어를 입력해주세요"
              />
            </div>
            <div className="cart-icon" onClick={() => navigate("/cart")}>
              <i className="fa fa-shopping-cart"></i>
            </div>
            {currentUser ? (
              <>
                <span>{currentUser.nick_name}님</span>
                <Button
                  className="navi-btn"
                  onClick={() => navigate("/profile")}
                >
                  마이페이지
                </Button>
                <Button onClick={handleLogout}>로그아웃</Button>
              </>
            ) : (
              <>
                <Button
                  className="signup-button"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </Button>
                <Button
                  className="signup-button"
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      {/* Sidebar 컴포넌트 추가 */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <Link to="/weather" className="sidebar-link">
          의류
        </Link>
        <Link to="/clothing" className="sidebar-link">
          가방
        </Link>
        <Link to="/backpack" className="sidebar-link">
          신발
        </Link>
        <Link to="/" className="sidebar-link">
          액세서리
        </Link>
        <Link to="/" className="sidebar-link">
          아우터
        </Link>
        <Link to="/notice/center" className="sidebar-link">
          고객센터
        </Link>
      </div>
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Header;
