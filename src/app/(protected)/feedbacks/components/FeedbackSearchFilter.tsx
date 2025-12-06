"use client";

import React from "react";
import {
  feedbackStatusMap,
  feedbackCategoryMap,
} from "@/components/StatusBadge";
import { FeedbackSearchFilterProps } from "@/types/feedback";

const FeedbackSearchFilter: React.FC<FeedbackSearchFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    onFilterChange({
      ...filters,
      [name]:
        name === "status" || name === "category"
          ? value === ""
            ? null
            : Number(value)
          : value,
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
      category: null,
      page: 1,
      limit: filters.limit || 10,
    };

    onFilterChange(cleared);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white border border-emerald-100 p-4 mb-6 rounded-xl shadow-sm flex flex-wrap gap-4 items-end"
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
          {Object.keys(feedbackStatusMap)
  .filter((key) => key !== "default")
  .map((key) => (
    <option key={key} value={key}>
      {feedbackStatusMap[Number(key)].label}
    </option>
  ))}

        </select>
      </div>

      {/* Category */}
      <div className="flex flex-col min-w-[160px]">
        <label className="text-sm text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={filters.category ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All</option>
          {Object.keys(feedbackCategoryMap)
  .filter((key) => key !== "default")
  .map((key) => (
    <option key={key} value={key}>
      {feedbackCategoryMap[Number(key)].label}
    </option>
  ))}
        </select>
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
    </form>
  );
};

export default FeedbackSearchFilter;
