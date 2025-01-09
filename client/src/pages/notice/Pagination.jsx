import React from 'react';
import './Pagination.css'; // Import the Pagination styles

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="pagination">
      {/* First Page Arrow */}
      <button
        className={`arrow-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handleFirstPage}
        disabled={currentPage === 1}
      >
        &#8656; {/* Double Left Arrow */}
      </button>

      {/* Previous Arrow */}
      <button
        className={`arrow-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        &#8592; {/* Left Arrow */}
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          className={`btn btn-secondary ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Arrow */}
      <button
        className={`arrow-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &#8594; {/* Right Arrow */}
      </button>

      {/* Last Page Arrow */}
      <button
        className={`arrow-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
      >
        &#8658; {/* Double Right Arrow */}
      </button>
    </div>
  );
};

export default Pagination;
