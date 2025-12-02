"use client";

import { useState } from "react";
import { useResidentsQuery } from "@/hooks/useResident";
import ResidentSearchFilter from "./components/ResidentSearchFilter";
import { ResidentTable } from "./components/ResidentTable";
import { Pagination } from "@/components/Pagination";

export default function ResidentListPage() {
    const [queryParams, setQueryParams] = useState({
        page: 1,
        limit: 10,
        search: "",
        status_resident: null,
        registration_from: null,
        registration_to:   null,
        approval_from:     null,
        approval_to:       null,
      });
      

  const { data: residentsData, isLoading } = useResidentsQuery(queryParams);

  const handleSearchFilter = (filters: any) => {
    setQueryParams({ ...queryParams, ...filters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-1">
      <h1 className="text-2xl font-semibold text-emerald-800 mb-8">
        Resident Management
      </h1>

      <ResidentSearchFilter onFilterChange={handleSearchFilter} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ResidentTable residents={residentsData?.data || []} />

          {residentsData?.meta && (
            <Pagination
              meta={residentsData.meta}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
