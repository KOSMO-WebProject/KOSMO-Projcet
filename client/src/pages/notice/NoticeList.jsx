import React, { useEffect, useState } from "react";
import "./NoticeList.css";
import axios from "axios";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NoticeItem from "./NoticeItem";

const NoticeList = () => {
  const { currentUser } = useSelector((state) => state.auth); // Redux 상태에서 currentUser 가져오기
  const nav = useNavigate();
  const [notices, setNotices] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 5;
  const gubun = searchParams.get("gubun") || "";
  const keyword = searchParams.get("keyword") || "";

  const [localKeyword, setLocalKeyword] = useState(keyword);

  // 공지사항 목록 가져오기
  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/notices", {
        params: { page: currentPage, size, gubun, keyword },
      });
      setNotices(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("공지사항을 불러오는 데 실패했습니다.");
      console.error(
        "Error fetching notices:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // 공지 클릭 시 읽음 처리
  const handleNoticeClick = async (noticeNo) => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    const userId = currentUser?.id;

    console.log("Debug: noticeNo:", noticeNo); // noticeNo 확인
    console.log("Debug: userId:", userId); // userId 확인
    console.log("Debug: currentUser:", currentUser); // currentUser 전체 확인

    // if (!noticeNo || !userId) {
    //   console.error('Invalid data:', { noticeNo, userId });
    //   alert('유효하지 않은 데이터입니다.');
    //   return;
    // }

    // try {
    //   console.log('읽음 처리 요청 데이터:', { noticeNo, userId });

    //   const response = await axios.post('/notices/read', { noticeNo, userId });

    //   if (response.status === 200) {
    //     console.log('읽음 처리 성공:', response.data);
    //     setNotices((prevNotices) =>
    //       prevNotices.map((notice) =>
    //         notice.notice_no === noticeNo ? { ...notice, isRead: true } : notice
    //       )
    //     );
    //   } else {
    //     console.error('Unexpected server response:', response);
    //     alert('읽음 처리에 실패했습니다.');
    //   }
    // } catch (error) {
    //   console.error('Error marking notice as read:', error.response?.data || error.message);
    //   alert('읽음 처리에 실패했습니다.');
    // }
  };

  // 검색 토글 처리
  const toggleSearch = () => setSearchVisible(!searchVisible);

  // 검색 실행
  const handleSearch = () => {
    setSearchParams({ gubun, keyword: localKeyword, page: 1 });
  };

  // 검색 조건 변경 핸들러
  const handleGubunChange = (event) => {
    setSearchParams({ gubun: event.target.value, keyword: "", page: 1 });
    setLocalKeyword("");
  };

  const handleKeywordChange = (event) => {
    setLocalKeyword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // 페이지네이션 처리
  const handlePageChange = (page) => {
    setSearchParams({ gubun, keyword, page });
  };

  // 글쓰기 버튼 클릭
  const onClickWrite = () => {
    if (currentUser) {
      nav("/notice/write");
    } else {
      alert("회원가입이 필요합니다.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [currentPage, size, gubun, keyword]);

  return (
    <>
      <Header />
      <div className="new-container">
        <div className="page-header">
          <h2>공지사항</h2>
          <hr />
        </div>
      </div>

      <div className="button-group">
        <button
          className="btn btn-warning"
          onClick={() => setSearchParams({ page: 1 })}
        >
          전체조회
        </button>
        <button className="btn btn-success" onClick={onClickWrite}>
          글쓰기
        </button>
        <div className="search-toggle">
          <button className="btn btn-secondary" onClick={toggleSearch}>
            <i className="bi bi-search"></i> 검색
          </button>
        </div>
      </div>

      {searchVisible && (
        <div className="search-row">
          <select
            className="form-select"
            value={gubun}
            onChange={handleGubunChange}
          >
            <option value="">분류선택</option>
            <option value="n_title">제목</option>
            <option value="n_writer">작성자</option>
            <option value="n_content">내용</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="검색어를 입력하세요"
            value={localKeyword}
            onChange={handleKeywordChange}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      )}

      {loading && <p className="loading">로딩 중...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
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
            {notices.map((notice) => (
              <NoticeItem key={notice.notice_no} notice={notice} />
            ))}
          </tbody>
        </table>
      )}

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
