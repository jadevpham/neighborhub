"use client";
import { useState } from "react";
import { ReferendumParam } from "@/types/referendum";
import { useReferendumListQuery } from "@/hooks/useReferendum";
import PageHeader from "@/components/PageHeader";
import ReferendumSearchFilter from "./components/ReferendumSearchFilter";
import { Pagination } from "@/components/Pagination";
import ReferendumItem from "./components/ReferendumItem";
import { useRouter } from "next/navigation";

export default function ReferendumsPage() {
  const [filters, setFilters] = useState<ReferendumParam>({
    page: 1,
    limit: 8,
    search: "",
    status: null,
  });

  const { data, isLoading, refetch } = useReferendumListQuery(filters);

  const handleFilterChange = (referendumFilters: any) => {
    setFilters(referendumFilters);
    // Gọi API list referendum
    refetch();
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  const router = useRouter();
  return (
    <>
      {/* === PAGE HEADER === */}
      <PageHeader
        title="Referendum Management - Referendum List"
        subtitle="Centralized referendum management."
        showBack={true}
      />

      {/* === FILTER FORM === */}
      <ReferendumSearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* === REFERENDUM LIST === */}
      {isLoading && <p>Loading...</p>}

      {!isLoading && (!data?.data || data.data.length === 0) && (
        <p className="text-gray-500 italic">No Referendum Found.</p>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.data.map((referendum) => (
            <ReferendumItem
              key={referendum.referendum_id}
              data={referendum}
              onClick={(id) => router.push(`/referendums/${id}`)}
            />
          ))}
        </div>
      )}

      {/* === PAGINATION === */}
      {data?.meta && (
        <div className="mt-6">
          <Pagination meta={data.meta} onPageChange={handlePageChange} />
        </div>
      )}
    </>
  );
}
