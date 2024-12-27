import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const {currentUser,logout} = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="left-section">
                        <button className="menu-button" onClick={toggleSidebar}>☰</button>
                        <Link to="/"><img src={logo} alt="WWW" className="logo" /></Link>
                        <nav className="navigation">
                            <Link to="/weather" className="nav-link">날씨</Link>
                            <Link to="/clothing" className="nav-link">의류</Link>
                            <Link to="/backpack" className="nav-link">가방</Link>
                            <Link to="/" className="nav-link">액세서리</Link>
                            <Link to="/notice" className="nav-link">커뮤니티</Link>
                        </nav>
                    </div>
                    <div className="right-section">
                        <i className="fa-solid fa-magnifying-glass"></i> {/* 돋보기 아이콘 */}
                        <input type="search" className="search-input" placeholder="검색어를 입력해주세요"/>
                        <div className="cart-icon" onClick={() => navigate('/cart')}>
                            <i className="fa fa-shopping-cart"></i>
                        </div>
                            {currentUser ? (
                                <>
                                <span className="navbar-text me-3">
                                   {currentUser.nickname}님
                                </span>
                                    <Button variant="outline-danger" onClick={() => {
                                        navigate("/profile")
                                    }}>마이페이지</Button>
                                    <Button variant="outline-danger" onClick={logout}>로그아웃</Button>
                                </>
                            ) : (
                                <>
                                    <Button className="singup-button" onClick={() => {
                                        navigate("/login")
                                    }}>로그인</Button>
                                    <Button className="singup-button" onClick={() => {
                                        navigate("/register")
                                    }}>회원가입</Button>
                                </>
                            )}
                        </div>
                    </div>
            </header>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <Link to="/weather" className="sidebar-link">의류</Link>
                <Link to="/clothing" className="sidebar-link">가방</Link>
                <Link to="/backpack" className="sidebar-link">신발</Link>
                <Link to="/" className="sidebar-link">액세서리</Link>
                <Link to="/" className="sidebar-link">아우터</Link>
                <Link to="/notice" className="sidebar-link">커뮤니티</Link>
            </div>
        </>
    );
};

export default Header;