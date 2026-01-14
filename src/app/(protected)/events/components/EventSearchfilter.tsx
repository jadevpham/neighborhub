"use client";

import React from "react";
import { eventStatusMap } from "@/components/StatusBadge";
import { EventSearchFilterProps, EventStatus } from "@/types/event";
import { useRouter } from "next/navigation";
const EventSearchFilter: React.FC<EventSearchFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    onFilterChange({
      ...filters,
      [name]: name === "status" ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };
  const handleClear = () => {
    const cleared = {
      search: "",
      status: null,
      start_date: null,
      end_date: null,
      page: 1,
      limit: filters.limit || 10,
    };

    onFilterChange(cleared);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/40 border border-emerald-100 p-4 mb-6 rounded-2xl shadow-2xl flex flex-wrap gap-4 items-end"
    >
      {/* Search */}
      <div className="flex flex-col flex-1 min-w-[220px]">
        <label className="text-sm text-gray-700 mb-1">Search</label>
        <input
          name="search"
          value={filters.search || ""}
          onChange={handleChange}
          placeholder="Search by title…"
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col min-w-[160px]">
        <label className="text-sm text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={filters.status ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All</option>
          {(Object.keys(eventStatusMap) as unknown as EventStatus[]).map(
            (status) => (
              <option key={status} value={status}>
                {eventStatusMap[status].label}
              </option>
            )
          )}
        </select>
      </div>
              {/* Start Date */}
              <div className="flex flex-col min-w-[160px]">
          <label className="text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            name="created_from"
            value={filters.start_date || ""}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col min-w-[160px]">
          <label className="text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            name="created_to"
            value={filters.end_date || ""}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

      {/* Search button */}
      <button
        type="submit"
        className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition cursor-pointer"
      >
        Search
      </button>

      {/* Clear button */}
      <button
        type="button"
        onClick={handleClear}
        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
      >
        Clear
      </button>
      {/* Create button */}
      <button
        type="button"
        onClick={() => router.push("/events/create")}
        className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
      >
        + Create
      </button>
    </form>
  );
};

export default EventSearchFilter;
