import React, { useEffect, useState } from "react";
import "./QnaList.css";
import axios from "axios";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import Pagination from "../../components/includes/Pagination";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import QnaItem from "./QnaItem";

const QnaList = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [qnas, setQnas] = useState([]);
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

  const fetchQnas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/qnas", {
        params: { page: currentPage, size, gubun, keyword },
      });
      setQnas(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Q&A를 불러오는 데 실패했습니다.";
      setError(errorMessage);
      console.error("Error fetching qnas:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleQnaClick = async (qnaNo) => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    const userId = currentUser?.id;

    try {
      const response = await axios.post("/qnas/read", { qnaNo, userId });
      if (response.status === 200) {
        setQnas((prevQnas) =>
          prevQnas.map((qna) =>
            qna.qna_no === qnaNo ? { ...qna, isRead: true } : qna
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
      nav("/qna/write");
    } else {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      nav("/login");
    }
  };

  useEffect(() => {
    fetchQnas();
  }, [currentPage, size, gubun, keyword]);

  return (
    <>
      <Header />
      <div className="new-container">
        <div className="page-header">
          <h2>Q & A</h2>
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
          <button className="btn btn-secondary" onClick={fetchQnas}>
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
            {qnas.map((qna) => (
              <QnaItem key={qna.qna_no} qna={qna} />
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

export default QnaList;
