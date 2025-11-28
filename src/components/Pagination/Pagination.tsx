"use client";
import React from "react";
import { PaginationProps } from "@/types/common";
const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange, className }) => {
    // const totalPages = Math.ceil(meta.total ?? 0 / meta.limit) || 1;
    const totalPages = Math.ceil((meta.total ?? 0) / meta.limit) || 1;
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== meta.page) {
        onPageChange(page);
      }
    };
  
    const renderPageNumbers = () => {
      const pages: number[] = [];
  
      // Nếu ít hơn 6 trang → hiển thị hết
      if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        // Nếu nhiều trang → hiển thị kiểu "1 ... 5 6 7 ... 20"
        const start = Math.max(2, meta.page - 1);
        const end = Math.min(totalPages - 1, meta.page + 1);
  
        pages.push(1);
        if (start > 2) pages.push(-1); // dấu ...
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push(-2); // dấu ...
        pages.push(totalPages);
      }
  
      return pages.map((p, i) =>
        p > 0 ? (
          <button
            key={i}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 rounded-md border transition-colors
              ${
                meta.page === p
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-300 text-gray-700 hover:bg-emerald-50"
              }`}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="px-2 text-gray-400">
            ...
          </span>
        )
      );
    };
  
    return (
      <div
        className={`flex items-center justify-center gap-2 mt-6 flex-wrap ${
          className || ""
        }`}
      >
        <button
          disabled={meta.page === 1}
          onClick={() => handlePageChange(meta.page - 1)}
          className="px-3 py-1 border rounded-md border-gray-300 text-gray-700 hover:bg-emerald-50 disabled:opacity-50"
        >
          Prev
        </button>
  
        {renderPageNumbers()}
  
        <button
          disabled={meta.page === totalPages}
          onClick={() => handlePageChange(meta.page + 1)}
          className="px-3 py-1 border rounded-md border-gray-300 text-gray-700 hover:bg-emerald-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;