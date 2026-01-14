"use client";
import { useState } from "react";
import { EventParam } from "@/types/event";
import { useEventListQuery } from "@/hooks/useEvent";
import PageHeader from "@/components/PageHeader";
import EventSearchFilter from "./components/EventSearchfilter";
import { Pagination } from "@/components/Pagination";
import EventCard from "./components/EventCard";
export default function EventsPage() {
  const [filters, setFilters] = useState<EventParam>({
    page: 1,
    limit: 8,
    search: "",
    status: null,
    start_date: null,
    end_date: null,
  });

  const { data, isLoading, refetch } = useEventListQuery(filters);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Gọi API list event
    refetch();
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  return (
    <>
      {/* === PAGE HEADER === */}
      <PageHeader
        title="Event Management - Event List"
        subtitle="Centralized event management."
        showBack={true}
      />

      {/* === FILTER FORM === */}
      <EventSearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* === EVENT LIST === */}
      {isLoading && <p>Loading...</p>}

      {!isLoading && (!data?.data || data.data.length === 0) && (
        <p className="text-gray-500 italic">No Event Found.</p>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        // <EventCard event={data?.data || []} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.data.map((event) => (
          <EventCard key={event.event_id} event={event} />
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
