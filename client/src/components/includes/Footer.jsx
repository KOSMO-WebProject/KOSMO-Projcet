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
                if (entry.isIntersecting) {
                    setIsVisible(true); // 화면에 나타날 때 상태 변경
                }
            },
            { threshold: 0.1 } // 10%가 보이면 트리거
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);
    
    /* 캘린더 map */
    const [calendars] = React.useState([ "My calendar", "calendar"])
    const calhandleNav = (calendar) => {
        if(calendar === "My calendar") {
            navigate('/calendar')
        }else if(calendar === "calendar") {
            navigate('/')
        }
    }
    /* 커뮤니티 map */
    const [commus] = React.useState([ "My Community", "Community"])
    const comhandleNav = (commu) => {
        if(commu === "My Community") {
            navigate('/community_list')
        }else if(commu === "Community") {
            navigate('/')
        }
    }
    /* 극장 map */
    const [theaters] = React.useState([ "My theater", "theater"])
    const thhandleNav = (theater) => {
        if(theater === "My theater") {
            navigate('/theater_list')
        }else if(theater === "theater") {
            navigate('/')
        }
    }

    return (
        <div className="container">
            <footer
                ref={footerRef}
                className={`footer-container ${isVisible ? 'visible' : ''}`}
            >
                <div className="py-5">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3">
                            <h5>Calendar</h5>
                            <ul className="nav flex-column">
                                {calendars.map((calendar, index)=>(
                                    <li key={index} className="nav-item mb-2">
                                        <span 
                                            className="nav-link p-0 text-body-secondary"
                                            onClick={()=>calhandleNav(calendar)}>
                                            {calendars[index]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <h5>Community</h5>
                            <ul className="nav flex-column">
                                {commus.map((commu, index)=>(
                                    <li key={index} className="nav-item mb-2">
                                        <span 
                                            className="nav-link p-0 text-body-secondary"
                                            onClick={() => comhandleNav(commu)}>
                                            {commus[index]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <h5>Theater</h5>
                            <ul className="nav flex-column">
                                {theaters.map((theater, index)=>(
                                    <li key={index} className="nav-item mb-2">
                                        <span 
                                            className="nav-link p-0 text-body-secondary"
                                            onClick={() => thhandleNav(theater)}>
                                            {theaters[index]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-5 offset-md-1 md-3">
                            <form action="">
                                <h5>Fill the space you like</h5>
                                <p className='p'>It doesn’t matter whether it’s a movie, a play, a musical, anything.</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label htmlFor="search_text" className="visually-hidden"> 검색어를 입력하세요. </label>
                                    <input id="search_text" type="text" className="form-control" placeholder="검색어를 입력하세요." />
                                    <button 
                                        className="btn btn-dark"
                                        type="button"
                                        onClick={() => navigate('/')} // 검색 버튼 클릭 시 네비게이트
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                            <p>Archaive Homepage Copyright&copy;2024</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;