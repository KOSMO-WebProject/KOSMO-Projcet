import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="footer-container" ref={footerRef}>
      <div className="container">
        <div className="row">
          {/* Calendar Section */}
          <div className="col-12 col-md-3 column">
            <h5>Calendar</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <span className="nav-link" onClick={() => navigate('/calendar')}>My Calendar</span>
              </li>
              <li className="nav-item mb-2">
                <span className="nav-link" onClick={() => navigate('/')}>Calendar</span>
              </li>
            </ul>
          </div>
          {/* Community Section */}
          <div className="col-12 col-md-3 column">
            <h5>Community</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <span className="nav-link" onClick={() => navigate('/community_list')}>My Community</span>
              </li>
              <li className="nav-item mb-2">
                <span className="nav-link" onClick={() => navigate('/')}>Community</span>
              </li>
            </ul>
          </div>
          {/* Theater Section */}
          <div className="col-12 col-md-3 column">
            <h5>Theater</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <span className="nav-link" onClick={() => navigate('/theater_list')}>My Theater</span>
              </li>
              <li className="nav-item mb-2">
                <span className="nav-link" onClick={() => navigate('/')}>Theater</span>
              </li>
            </ul>
          </div>
          {/* Search Section */}
          <div className="col-12 col-md-3 column search-form">
            <h5>Fill the space you like</h5>
            <input type="text" className="form-control" placeholder="검색어를 입력하세요." />
            <button className="btn btn-dark" onClick={() => navigate('/')}>
              Search
            </button>
          </div>
        </div>
        <div className="row justify-content-between py-4 my-4 border-top">
          <p>Archaive Homepage Copyright&copy;2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
