import React, { useEffect, useState } from "react";
import "./NoticeList.css";
import axios from "axios";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import Pagination from "../../components/includes/Pagination";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NoticeItem from "./NoticeItem";

const NoticeList = () => {
  const { currentUser } = useSelector((state) => state.auth);
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
      const errorMessage =
        error.response?.data?.message || "공지사항을 불러오는 데 실패했습니다.";
      setError(errorMessage);
      console.error("Error fetching notices:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNoticeClick = async (noticeNo) => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    const userId = currentUser?.id;

    try {
      const response = await axios.post("/notices/read", { noticeNo, userId });
      if (response.status === 200) {
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice.notice_no === noticeNo ? { ...notice, isRead: true } : notice
          )
        );
      }
    } catch (error) {
      console.error("읽음 처리에 실패했습니다.", error);
      alert("읽음 처리에 실패했습니다.");
    }
  };

  const toggleSearch = () => setSearchVisible(!searchVisible);

  const handleSearch = () => {
    setSearchParams({ gubun, keyword: localKeyword, page: 1 });
  };

  const handleResetSearch = () => {
    setSearchParams({});
    setLocalKeyword("");
  };

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

  const handlePageChange = (page) => {
    setSearchParams({ gubun, keyword, page });
  };

  const onClickWrite = () => {
    if (currentUser) {
      nav("/notice/write");
    } else {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      nav("/login");
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
          <button
            className="btn btn-secondary icon-button"
            onClick={toggleSearch}
          >
            <i className="fa fa-search"></i> {/* Font Awesome 돋보기 아이콘 */}
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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleResetSearch}
          >
            초기화
          </button>
        </div>
      )}

      {loading && <p className="loading">로딩 중...</p>}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={fetchNotices}>
            다시 시도
          </button>
        </div>
      )}

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
      <div style={{ height: "50px" }}></div>
      <Footer />
    </>
  );
};

export default NoticeList;
