import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              if (entry.isIntersecting) {
                  setIsVisible(true);
              }
          },
          { threshold: 0.1 }
      );
      if (footerRef.current) {
          observer.observe(footerRef.current);
      }
      return () => observer.disconnect();
  }, []);

  /* Weather map */
  const [weathers] = React.useState(["오늘의 날씨", "AI 옷 추천"])
  const weatherHandleNav = (weather) => {
      if(weather === "오늘의 날씨") {
          navigate('/weather')
      } else if(weather === "AI 옷 추천") {
          navigate('/weather')
      }
  }

  /* Product map */
  const [products] = React.useState(["의류", "가방", "악세서리"])
  const productHandleNav = (product) => {
      if(product === "의류") {
          navigate('/product_list')
      } else if(product === "가방") {
          navigate('/product_list')
      } else if(product === "악세서리") {
          navigate('/product_list')
      }
  }

  /* Community map */
  const [commus] = React.useState(["고객센터", "공지사항", "Q&A", "게시판"])
  const comHandleNav = (commu) => {
      if(commu === "고객센터") {
          navigate('/communitypage')
      } else if(commu === "공지사항") {
          navigate('/noticepage')
      } else if(commu === "Q&A") {
          navigate('/qnapage')
      } else if(commu === "게시판") {
          navigate('/communitypage')
      }
  }

  return (
      <>
          <footer
              ref={footerRef}
              className={`footer-container ${isVisible ? 'visible' : ''}`}
          >
              <div className="py-5">
                  <div className="row">
                      <div className="col-6 col-md-2 mb-3">
                          <h5>Weather</h5>
                          <ul className="nav flex-column">
                              {weathers.map((weather, index) => (
                                  <li key={index} className="nav-item mb-2">
                                      <span
                                          className="nav-link p-0 text-body-secondary"
                                          onClick={() => weatherHandleNav(weather)}>
                                          {weather}
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="col-6 col-md-2 mb-3">
                          <h5>Product</h5>
                          <ul className="nav flex-column">
                              {products.map((product, index) => (
                                  <li key={index} className="nav-item mb-2">
                                      <span
                                          className="nav-link p-0 text-body-secondary"
                                          onClick={() => productHandleNav(product)}>
                                          {product}
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="col-6 col-md-2 mb-3">
                          <h5>Community</h5>
                          <ul className="nav flex-column">
                              {commus.map((commu, index) => (
                                  <li key={index} className="nav-item mb-2">
                                      <span
                                          className="nav-link p-0 text-body-secondary"
                                          onClick={() => comHandleNav(commu)}>
                                          {commu}
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="col-md-5 offset-md-1 md-3">
                          <form action="">
                              <p className='p'>찾고 싶은 상품이 있나요?</p>
                              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                  <label htmlFor="search_text" className="visually-hidden"> 검색어를 입력하세요. </label>
                                  <input id="search_text" type="text" className="form-control" placeholder="검색어를 입력하세요." />
                                  <button
                                      className="btn btn-dark"
                                      type="button"
                                      onClick={() => navigate('/')}
                                  >
                                      Search
                                  </button>
                              </div>
                          </form>
                      </div>
                      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                          <p>WHETHER TO WEAR FOR WEATHER Homepage Copyright&copy;2024</p>
                      </div>
                  </div>
              </div>
          </footer>
      </>
  );
};

export default Footer;
