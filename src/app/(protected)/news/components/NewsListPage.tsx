"use client";

import { useState, useEffect, useMemo } from "react";
import { NewsCard } from "./NewsCard";
import { NewsSearchFilter } from "./NewsSearchFilter";
import { useNewsListQuery } from "@/hooks/useNews";
import { Pagination } from "@/components/Pagination";
import { NewsData } from "@/types/news";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
const PAGE_SIZE = 8;

export default function NewsListPage() {
  const searchParams = useSearchParams();
  const scopeFromURL = searchParams.get("scope");

  //FE scope (site | zone)
  const finalScope = scopeFromURL === "zone" ? "zone" : "site";

  // UI pagination tách biệt theo từng scope
  const [pageSite, setPageSite] = useState(1);
  const [pageZone, setPageZone] = useState(1);

  const currentPage = finalScope === "site" ? pageSite : pageZone;

  const setCurrentPage = (newPage: number) => {
    if (finalScope === "site") setPageSite(newPage);
    else setPageZone(newPage);
  };

  // BE query param – KHÔNG gửi scope
  const [queryParams, setQueryParams] = useState({
    page: 1, // BE chỉ trả page 1
    limit: 100, // lấy đủ cho FE phân trang
    search: "",
    status: undefined as number | undefined,
    created_from: undefined as string | undefined,
    created_to: undefined as string | undefined,
  });

  const handleSearchFilter = (filters: any) => {
    setPageSite(1);
    setPageZone(1);

    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      status: filters.status === null ? undefined : filters.status,
      page: 1,
    }));
  };

  // BE call
  const { data: newsListData, isLoading } = useNewsListQuery(queryParams);

  // Raw list từ BE (BE đã xử lý role)
  const rawList: NewsData[] = newsListData?.data ?? [];

  // FE filter theo subsidebar (CHỈ LỘC SCÔPE SAU BE)
  const scopedList = useMemo(() => {
    return rawList.filter((n) => n.scope === finalScope);
  }, [rawList, finalScope]);

  // tổng item sau lọc
  const totalItems = scopedList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  // fix trường hợp page vượt quá số page mới
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  // cắt trang theo scope
  const pagedList = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return scopedList.slice(start, start + PAGE_SIZE);
  }, [scopedList, currentPage]);

  // meta cho FE pagination (BE không can thiệp)
  const paginationMeta = {
    page: currentPage,
    limit: PAGE_SIZE,
    total: totalItems,
  };

  return (
    <>
      <PageHeader
        title="News Management - New List"
        subtitle="Manage all news posts across the platform."
        showBack={true}
      />

      <NewsSearchFilter onFilterChange={handleSearchFilter} />

      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {pagedList.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}

            {pagedList.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-10">
                No news found.
              </p>
            )}
          </div>

          {totalItems > 0 && (
            <Pagination meta={paginationMeta} onPageChange={setCurrentPage} />
          )}
        </>
      )}
    </>
  );
}
