"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toBEDate } from "@/utils/formatDate";
const newsStatusList = [
  { value: "", label: "All" },
  { value: 0, label: "Draft" },
  { value: 1, label: "Published" },
  { value: 2, label: "Archived" },
  { value: 3, label: "Scheduled" },
];

interface NewsSearchFilterProps {
  onFilterChange: (filters: any) => void;
}

export const NewsSearchFilter: React.FC<NewsSearchFilterProps> = ({
  onFilterChange,
}) => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    created_from: "",
    created_to: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    onFilterChange({
      search: filters.search || null,
      status: filters.status ? Number(filters.status) : undefined,
      created_from: toBEDate(filters.created_from) || null,
      created_to: toBEDate(filters.created_to) || null,
    });
  };

  const handleClear = () => {
    const cleared = {
      search: "",
      status: "",
      created_from: "",
      created_to: "",
    };

    setFilters(cleared);

    onFilterChange({
      search: null,
      status: undefined,
      created_from: null,
      created_to: null,
    });
  };

  return (
    <div className="mb-6">
      <form
        onSubmit={handleSearch}
        className="bg-white border border-emerald-100 p-4 mb-6 rounded-lg shadow-sm flex flex-wrap gap-3 items-end"
      >
        {/* Search by title */}
        <div className="flex flex-col flex-1 min-w-[220px]">
          <label className="text-sm text-gray-600 mb-1">Search Title</label>
          <input
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by title..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col min-w-[150px]">
          <label className="text-sm text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {newsStatusList.map((s) => (
              <option key={s.label} value={String(s.value)}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Created From */}
        <div className="flex flex-col min-w-[160px]">
          <label className="text-sm text-gray-600 mb-1">Created From</label>
          <input
            type="date"
            name="created_from"
            value={filters.created_from}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Created To */}
        <div className="flex flex-col min-w-[160px]">
          <label className="text-sm text-gray-600 mb-1">Created To</label>
          <input
            type="date"
            name="created_to"
            value={filters.created_to}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => router.push("/news/create")}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            + Create
          </button>
        </div>
      </form>
    </div>
  );
};
