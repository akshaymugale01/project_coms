import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];
    const visiblePages = 5;

    if (totalPages <= visiblePages + 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= visiblePages) {
        for (let i = 1; i <= visiblePages; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      } else if (page > totalPages - visiblePages) {
        pages.push(1, '...');
        for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, '...');
        for (let i = page - 2; i <= page + 2; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {visiblePages.map((pg, index) =>
        pg === '...' ? (
          <span key={index} className="px-4 py-2">
            ...
          </span>
        ) : (
          <button
            key={pg}
            onClick={() => onPageChange(pg)}
            className={`px-4 py-2 rounded ${pg === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {pg}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
