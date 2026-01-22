"use client";

import ArrowLeft from "@/src/assets/icons/arrow-left.svg";
import ArrowRight from "@/src/assets/icons/arrow-right.svg";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxPageButtons?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  maxPageButtons = 5,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const groupIndex = Math.floor((currentPage - 1) / maxPageButtons);
  const start = groupIndex * maxPageButtons + 1;
  const end = Math.min(start + maxPageButtons - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const hasPageGroups = totalPages > 1;
  const isOnFirstPage = currentPage === 1;
  const isOnLastPage = currentPage === totalPages;

  const baseButtonST =
    "grid place-content-center w-10 h-10 bg-transparent border-none cursor-pointer transition-colors duration-200 select-none disabled:cursor-default";

  return (
    <ul className="flex items-center gap-[0.4rem] list-none select-none">
      {hasPageGroups && (
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={isOnFirstPage}
            aria-label="이전 페이지"
            className={`${baseButtonST} text-gray-300 hover:not-disabled:text-black disabled:opacity-30`}
          >
            <img
              src={ArrowLeft.src || ArrowLeft}
              alt=""
              className="w-[0.7rem] h-[1.1rem] grayscale opacity-50"
            />
          </button>
        </li>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <li key={page}>
            <button
              onClick={() => goToPage(page)}
              disabled={isActive}
              aria-current={isActive ? "page" : undefined}
              className={`
                ${baseButtonST} text-[14px] 
                ${
                  isActive
                    ? "text-gray-950 font-bold border-b-[2px] border-[#3b82f6]"
                    : "text-gray-300 hover:not-disabled:text-black"
                }
              `}
            >
              {page}
            </button>
          </li>
        );
      })}

      {hasPageGroups && (
        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={isOnLastPage}
            aria-label="다음 페이지"
            className={`${baseButtonST} text-gray-300 hover:not-disabled:text-black disabled:opacity-30`}
          >
            <img
              src={ArrowRight.src || ArrowRight}
              alt=""
              className="w-[0.7rem] h-[1.1rem] grayscale opacity-50"
            />
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
