"use client";

import { useState } from "react";
import { useFeedbackListQuery } from "@/hooks/useFeedback";
import { FeedbackParam } from "@/types/feedback";
import {
  feedbackStatusMap,
  feedbackCategoryMap,
} from "@/components/StatusBadge";
import Pagination from "@/components/Pagination/Pagination";
import { useMeQuery } from "@/hooks/useAuth";
import Image from "next/image";
import { Search, Filter } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import FeedbackSearchFilter from "./components/FeedbackSearchFilter";
import FeedbackItem from "./components/FeedbackItem";

export default function FeedbackListPage() {
  const [filters, setFilters] = useState<FeedbackParam>({
    page: 1,
    limit: 8,
    search: "",
    status: null,
    category: null,
  });

  const { data, isLoading, refetch } = useFeedbackListQuery(filters);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Gọi API list feedback
    refetch();
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <>
      {/* === PAGE HEADER === */}
      <PageHeader
        title="FeedBack Management - Feedback List"
        subtitle="View and manage all user feedback."
        showBack={true}
      />

      {/* === FILTER FORM === */}
      <FeedbackSearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* === FEEDBACK LIST === */}
      {isLoading && <p>Loading...</p>}

      {!isLoading && (!data?.data || data.data.length === 0) && (
        <p className="text-gray-500 italic">No feedback found.</p>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <FeedbackItem data={data?.data || []} />
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
