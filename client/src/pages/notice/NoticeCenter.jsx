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


  const faqCategories = [
    {
      title: "회원가입 및 계정 관리",
      icon: "👤",
      items: [
        { question: "회원가입은 어떻게 하나요?", answer: "홈페이지 오른쪽 상단의 [회원가입] 버튼을 클릭하여 간단한 정보를 입력하면 가입이 완료됩니다." },
        { question: "비밀번호를 잊어버렸어요. 어떻게 해야 하나요?", answer: "로그인 페이지에서 [비밀번호 찾기]를 클릭한 후 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다." },
        { question: "회원 탈퇴는 어떻게 하나요?", answer: "마이페이지 ▶ 계정 설정 ▶ 회원 탈퇴 메뉴에서 진행할 수 있습니다." },
      ],
    },
    {
      title: "상품 주문 및 결제",
      icon: "💳",
      items: [
        { question: "상품 주문은 어떻게 하나요?", answer: "원하는 상품을 장바구니에 담고, 결제 화면에서 배송 정보와 결제 정보를 입력하면 주문이 완료됩니다." },
        { question: "어떤 결제 수단을 지원하나요?", answer: "신용카드, 체크카드, 계좌이체, 모바일 간편결제, 무통장입금을 지원합니다." },
        { question: "주문 확인은 어디서 할 수 있나요?", answer: "마이페이지 ▶ 주문 내역 메뉴에서 확인할 수 있습니다." },
      ],
    },
    {
      title: "배송",
      icon: "🚚",
      items: [
        { question: "배송 기간은 얼마나 걸리나요?", answer: "일반적으로 주문 후 2~3일 내에 배송됩니다. 지역 및 배송 상황에 따라 차이가 있을 수 있습니다." },
        { question: "배송 상태는 어떻게 확인하나요?", answer: "마이페이지 ▶ 주문 내역에서 배송 추적 버튼을 클릭하여 확인할 수 있습니다." },
        { question: "해외 배송이 가능한가요?", answer: "현재는 국내 배송만 가능합니다. 해외 배송은 추후 서비스에 추가될 예정입니다." },
      ],
    },
    {
      title: "교환 및 반품",
      icon: "🔄",
      items: [
        { question: "교환/반품은 어떻게 신청하나요?", answer: "마이페이지 ▶ 주문 내역에서 교환/반품 신청 버튼을 클릭한 후, 필요한 정보를 입력하여 신청하세요." },
        { question: "교환/반품 가능한 기간은 언제까지인가요?", answer: "상품 수령 후 7일 이내에 교환/반품을 신청할 수 있습니다." },
        { question: "반품 배송비는 누가 부담하나요?", answer: "제품 불량 또는 오배송의 경우 쇼핑몰에서 부담하며, 단순 변심으로 인한 반품 시 고객님께서 부담하셔야 합니다." },
      ],
    },
    {
      title: "할인 및 프로모션",
      icon: "🌟",
      items: [
        { question: "현재 진행 중인 할인 행사는 무엇인가요?", answer: "현재 진행 중인 할인 행사는 이벤트 페이지에서 확인할 수 있습니다." },
        { question: "프로모션 코드 사용 방법은?", answer: "결제 시 프로모션 코드를 입력하면 할인이 적용됩니다." },
        { question: "할인 혜택은 중복으로 받을 수 있나요?", answer: "일부 할인은 중복 적용이 가능하며, 자세한 내용은 이벤트 페이지의 공지사항을 확인하세요." },
      ],
    },
    {
      title: "기타",
      icon: "📜",
      items: [
        { question: "고객센터 운영 시간은 어떻게 되나요?", answer: "고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다. (점심시간: 12시~1시, 주말 및 공휴일 제외)" },
        { question: "쿠폰은 어떻게 사용하나요?", answer: "결제 화면에서 쿠폰 코드를 입력하면 즉시 할인이 적용됩니다." },
        { question: "포인트는 어떻게 적립되고 사용할 수 있나요?", answer: "구매 금액의 일정 비율이 포인트로 적립됩니다. 적립된 포인트는 결제 시 사용 가능합니다." },
      ],
    },
  ];


  return (
    <>
      <Header />
    <div className="notice-center-wrapper">

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
            {/* 이전 버튼 */}
            <button
              className="page-button"
              disabled={currentPage === 1} // 첫 페이지에서 비활성화
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </button>

            {/* 페이지 버튼 */}
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

            {/* 다음 버튼 */}
            <button
              className="page-button"
              disabled={currentPage === totalPages} // 마지막 페이지에서 비활성화
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-container">
  <div className="section-header">
    <h2 className="section-title">FAQ</h2>
  </div>
  <p className="section-description">자주 묻는 질문을 카테고리별로 확인하세요.</p>
  <hr className="section-line" />
  <div className="faq-grid">
    {faqCategories.map((category, catIndex) => (
      <div key={catIndex} className="faq-category">
        <h3 className="faq-category-title">
          <span className="faq-icon">{category.icon}</span> {category.title}
        </h3>
        {category.items.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => toggleFaq(`${catIndex}-${index}`)}
              className={`faq-question ${expandedFaq === `${catIndex}-${index}` ? "active" : ""}`}
            >
              Q: {item.question}
            </button>
            {expandedFaq === `${catIndex}-${index}` && (
              <p className="faq-answer">A: {item.answer}</p>
            )}
          </div>
        ))}
      </div>
    ))}
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

    </div>
      <Footer />
      </>
  );
};

export default NoticeCenter;
