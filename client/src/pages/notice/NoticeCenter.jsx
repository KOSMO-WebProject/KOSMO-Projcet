import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import axios from "axios";
import "./NoticeCenter.css";

const NoticeCenter = () => {
  const [latestNotices, setLatestNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const fetchLatestNotices = async () => {
      try {
        const response = await axios.get("/notices", {
          params: { page: currentPage, size: 3 },
        });
        setLatestNotices(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching latest notices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNotices();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="notice-center-wrapper">
      <Header />

      <main className="notice-center-container">
        {/* 공지사항 */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">공지사항</h2>
            <Link to="/notice" className="view-more">
              바로가기 ➔
            </Link>
          </div>
          <p className="section-description">최신 공지사항을 확인하세요.</p>
          <hr className="section-line" />
          <ul className="notice-list">
            {isLoading ? (
              <div className="spinner"></div>
            ) : latestNotices.length > 0 ? (
              latestNotices.map((notice, index) => (
                <li key={notice.notice_no} className="notice-item">
                  <div className="notice-number">{index + 1}</div>
                  <Link
                    to={`/notice/${notice.notice_no}`}
                    className="notice-link"
                  >
                    {notice.title}
                  </Link>
                  <div className="notice-meta">
                    <span>작성자: {notice.nick_name}</span>
                    <span>작성일: {notice.create_at}</span>
                  </div>
                </li>
              ))
            ) : (
              <p>공지사항이 없습니다.</p>
            )}
          </ul>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">FAQ</h2>
          </div>
          <p className="section-description">자주 묻는 질문</p>
          <hr className="section-line" />
          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-icon">🔄</div>
              <h3>반품/교환 및 환불</h3>
              <ul>
                <li>반품정책은 어떻게 되나요?</li>
                <li>반품방법은 어떻게 되나요?</li>
                <li>교환서비스를 제공하나요?</li>
              </ul>
            </div>
            <div className="faq-item">
              <div className="faq-icon">🚚</div>
              <h3>출고 및 배송</h3>
              <ul>
                <li>배송옵션에는 어떤 게 있나요?</li>
                <li>주문한 제품 중 왜 일부만 먼저 배송되었나요?</li>
                <li>온라인에서 구매한 제품을 매장에서 픽업할 수 있나요?</li>
              </ul>
            </div>
            <div className="faq-item">
              <div className="faq-icon">💳</div>
              <h3>주문 및 결제</h3>
              <ul>
                <li>결제 방법에는 어떤 것이 있나요?</li>
                <li>주문을 취소하거나 주문 내용을 변경할 수 있나요?</li>
                <li>주문 및 배송 상황은 어떻게 조회하나요?</li>
              </ul>
            </div>
            <div className="faq-item">
              <div className="faq-icon">🛒</div>
              <h3>쇼핑하기</h3>
              <ul>
                <li>EVENT 쿠폰은 어떻게 사용하나요?</li>
                <li>사이즈 정보는 어떻게 알 수 있나요?</li>
                <li>제품 구매 시 참고할 가이드가 있나요?</li>
              </ul>
            </div>
            <div className="faq-item">
              <div className="faq-icon">🌟</div>
              <h3>멤버십</h3>
              <ul>
                <li>멤버가 되면 어떤 혜택을 받나요?</li>
                <li>멤버십 가입은 어떻게 하나요?</li>
                <li>멤버십 서비스는 어떻게 이용하나요?</li>
              </ul>
            </div>
            <div className="faq-item">
              <div className="faq-icon">📜</div>
              <h3>공지 및 기타 정책</h3>
              <ul>
                <li>공지사항 및 고객알림</li>
                <li>A/S 절차</li>
                <li>품질보증기한 안내</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Q&A */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Q&A</h2>
            <Link to="/qna" className="view-more">
              바로가기 ➔
            </Link>
          </div>
          <p className="qna-subtitle">궁금하신 사항이 있으면 문의해주세요</p>
          <hr className="section-line" />
          <div className="qna-grid">
            <div className="qna-item">
              <div className="qna-icon">💬</div>
              <h3>채팅 문의</h3>
              <p>제품 및 주문 | 09:00 - 18:00</p>
              <p>월요일 - 금요일(공휴일 제외)</p>
            </div>
            <div className="qna-item">
              <div className="qna-icon">📞</div>
              <h3>전화 문의</h3>
              <p>02-123-4567</p>
              <p>제품 및 주문 | 09:00 - 18:00</p>
              <p>A/S 서비스 | 09:00 - 18:00</p>
              <p>월요일 - 금요일(공휴일 제외)</p>
            </div>
            <div className="qna-item">
              <div className="qna-icon">🏢</div>
              <h3>매장 찾기</h3>
              <p>서울특별시 금천구 가산디지털2로 101</p>
              <p>한라원앤타워</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NoticeCenter;
