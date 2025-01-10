import React, { useEffect, useState } from 'react';
import './NoticeList.css';
import axios from 'axios';
import Footer from '../../components/includes/Footer';
import NoticeItem from './NoticeItem';
import Header from '../../components/includes/Header';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { useSearchParams } from 'react-router-dom';
import Pagination from "../../components/includes/Pagination";

const NoticeList = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const nav = useNavigate();
    const [notices, setNotices] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // Use useSearchParams to get query params from the URL
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;  // Default to page 1 if not provided
    const size = Number(searchParams.get('size')) || 5;  // Default to 10 items per page

    const noticeList = async () => {
        try {
            const response = await axios.get('/notices', {
                params: {
                    page: currentPage,
                    size: size,  // Number of items per page
                },
            });
            setNotices(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    useEffect(() => {
        noticeList();
    }, [currentPage, size]);  // Fetch notices whenever currentPage or size changes

    const onClickMove = () => {
        if (currentUser) {
            nav('/notice/write');
        } else {
            alert('회원가입이 필요합니다.');
        }
    };

    const toggleSearch = () => setSearchVisible(!searchVisible);

    // Handle page change and update the query parameter in the URL
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setSearchParams({ page, size });  // Update URL with new page and size
        }
    };

    return (
        <>
            <Header />
            <div className="new-container">
                <div className="page-header">
                    <h2>공지사항 <small>글목록</small></h2>
                    <hr />
                </div>
            </div>

            <div className="button-group">
                <button className="btn btn-warning" onClick={noticeList}>전체조회</button>
                <button className="btn btn-success" onClick={onClickMove}>글쓰기</button>
                <div className="search-toggle">
                    <button className="btn btn-secondary" onClick={toggleSearch}>
                        <i className="bi bi-search"></i> 검색
                    </button>
                </div>
            </div>

            <div className="search-visible">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notices && notices.map((notice) => (
                        <NoticeItem key={notice.notice_no} notice={notice} />
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <Footer />
        </>
    );
};

export default NoticeList;