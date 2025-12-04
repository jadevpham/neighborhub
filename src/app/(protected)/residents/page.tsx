"use client";

import { useState } from "react";
import { useResidentsQuery } from "@/hooks/useResident";
import ResidentSearchFilter from "./components/ResidentSearchFilter";
import { ResidentTable } from "./components/ResidentTable";
import { Pagination } from "@/components/Pagination";
import PageHeader from "@/components/PageHeader";
export default function ResidentListPage() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    status_resident: null,
    registration_from: null,
    registration_to: null,
    approval_from: null,
    approval_to: null,
  });

  const { data: residentsData, isLoading } = useResidentsQuery(queryParams);

  const handleSearchFilter = (filters: any) => {
    setQueryParams({ ...queryParams, ...filters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      <PageHeader
        title="Residents Management - Residents List"
        subtitle="Manage resident accounts across sites and zones."
        showBack={true}
      />

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
    </>
  );
}
