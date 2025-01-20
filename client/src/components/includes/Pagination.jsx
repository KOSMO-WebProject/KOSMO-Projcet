// Pagination 컴포넌트를 import 하기 위한 React import
import React from 'react';
// 스타일링을 위한 CSS 파일 import
import './styles/Pagination.css';

// Pagination 컴포넌트 정의
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // 페이지 번호를 생성하는 함수
  const generatePageNumbers = () => {
    let pages = []; // 페이지 번호를 담을 배열

    if (totalPages <= 7) { // 전체 페이지가 7 이하인 경우
      for (let i = 1; i <= totalPages; i++) pages.push(i); // 모든 페이지 번호를 추가
    } else { // 전체 페이지가 8 이상인 경우
      if (currentPage <= 4) { // 현재 페이지가 4 이하인 경우
        pages = [1, 2, 3, 4, '...', totalPages]; // 처음 4개와 마지막 페이지 추가
      } else if (currentPage >= totalPages - 3) { // 현재 페이지가 마지막 4개 중 하나인 경우
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]; // 처음, 마지막 4개 추가
      } else { // 현재 페이지가 중간에 위치한 경우
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]; // 처음, 현재 주변, 마지막 추가
      }
    }
    return pages; // 생성된 페이지 번호 배열 반환
  };

  // Pagination 컴포넌트 렌더링
  return (
    <div className="pagination"> {/* 전체 Pagination 컨테이너 */}
      {/* 첫 페이지로 이동 버튼 */}
      <button
        className="arrow-btn" // 화살표 버튼 스타일
        disabled={currentPage === 1} // 현재 페이지가 첫 페이지면 비활성화
        onClick={() => onPageChange(1)} // 첫 페이지로 이동하는 함수 호출
      >
        &#8656; {/* 화살표 아이콘 */}
      </button>

      {/* 이전 페이지로 이동 버튼 */}
      <button
        className="arrow-btn"
        disabled={currentPage === 1} // 현재 페이지가 첫 페이지면 비활성화
        onClick={() => onPageChange(currentPage - 1)} // 이전 페이지로 이동하는 함수 호출
      >
        &#8592; {/* 화살표 아이콘 */}
      </button>

      {/* 페이지 번호 버튼 렌더링 */}
      {generatePageNumbers().map((page, index) => (
        typeof page === 'number' ? ( // 페이지 번호가 숫자인 경우
          <button
            key={index} // 고유 키 값 지정
            className={currentPage === page ? 'active' : ''} // 현재 페이지면 활성화 클래스 추가
            onClick={() => onPageChange(page)} // 해당 페이지로 이동하는 함수 호출
          >
            {page} {/* 페이지 번호 */}
          </button>
        ) : (
          <span key={index} className="dots">...</span> // "..." 텍스트 표시
        )
      ))}

      {/* 다음 페이지로 이동 버튼 */}
      <button
        className="arrow-btn"
        disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지면 비활성화
        onClick={() => onPageChange(currentPage + 1)} // 다음 페이지로 이동하는 함수 호출
      >
        &#8594; {/* 화살표 아이콘 */}
      </button>

      {/* 마지막 페이지로 이동 버튼 */}
      <button
        className="arrow-btn"
        disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지면 비활성화
        onClick={() => onPageChange(totalPages)} // 마지막 페이지로 이동하는 함수 호출
      >
        &#8658; {/* 화살표 아이콘 */}
      </button>
    </div>
  );
};

// Pagination 컴포넌트를 외부에서 사용할 수 있도록 export
export default Pagination;