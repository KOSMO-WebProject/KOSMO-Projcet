import React from 'react';
import './Header.css'; // CSS 스타일 파일
import { Link } from 'react-router';


function Header() {
  return (
    <header className="header">
      <img src="../images/logo.png" alt="Logo" className="header-logo" />
      <nav className="header-nav">
        <ul>
          <li><a href="#new">New</a></li>
          <li><a href="#men">Men</a></li>
          <li><a href="#women">Women</a></li>
          <li><a href="#kids">Kids</a></li>
          <li><a href="#sale">Sale</a></li>
        </ul>
      </nav>
      <div className="header-search">
        <i className="fa-solid fa-magnifying-glass" ></i> {/* 돋보기 아이콘 */}
        <input type="search" placeholder="검색" />
        
      </div>
      <div className="header-icons">
        <Link to='/posts'><span>고객센터</span></Link>
        <span>ㅣ</span>
        <Link to="/register"><i className='fa-regular fa-user'></i></Link> {/* 유저 아이콘 */}
        <i className="fas fa-heart"></i> {/* 좋아요 아이콘 */}
        <i className="fas fa-shopping-cart"></i> {/* 장바구니 아이콘 */}
      </div>
    </header>
  );
}

export default Header;