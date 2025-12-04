"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResidentSearchFilterProps } from "@/types/resident";
import StatusSelect from "@/components/StatusSelect";
import { toBEDate } from "@/utils/formatDate";
const ResidentSearchFilter: React.FC<ResidentSearchFilterProps> = ({
  onFilterChange,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    status_resident: "",
    registration_from: null as Date | null,
    registration_to: null as Date | null,
    approval_from: null as Date | null,
    approval_to: null as Date | null,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    onFilterChange({
      ...filters,
      registration_from: filters.registration_from
        ? toBEDate(filters.registration_from)
        : null,
      registration_to: filters.registration_to
        ? toBEDate(filters.registration_to)
        : null,
      approval_from: filters.approval_from
        ? toBEDate(filters.approval_from)
        : null,
      approval_to: filters.approval_to ? toBEDate(filters.approval_to) : null,
    });
  };

  const handleClear = () => {
    const cleared = {
      search: "",
      status_resident: "",
      registration_from: null,
      registration_to: null,
      approval_from: null,
      approval_to: null,
    };

    setFilters(cleared); // xoá toàn bộ key cũ
    onFilterChange(cleared);
  };
  return (
    <div className="mb-6">
      <form
        onSubmit={handleSearch}
        className="bg-white border border-emerald-100 p-4 mb-6 rounded-lg shadow-sm flex flex-row items-end gap-4 overflow-x-auto"
      >
        {/* Search */}
        <div className="flex flex-col min-w-[220px] flex-1">
          <label className="text-sm text-gray-600 mb-1">Search</label>
          <input
            name="search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search name, email, or phone..."
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col min-w-[150px]">
          <label className="text-sm text-gray-600 mb-1">Status</label>

          <StatusSelect
            name="status_resident"
            value={filters.status_resident}
            onChange={(e) =>
              setFilters({ ...filters, status_resident: e.target.value })
            }
            type="resident"
          />
        </div>

        {/* Registered Date Range */}
        <div className="flex flex-col w-[260px]">
          <label className="text-sm text-gray-600 mb-1">
            Registered (From – To)
          </label>
          <div className="flex gap-2">
            <DatePicker
              selected={filters.registration_from}
              onChange={(date) =>
                setFilters({ ...filters, registration_from: date })
              }
              placeholderText="From"
              maxDate={new Date()}
              className="border px-2 py-2 rounded-md w-full"
            />
            <DatePicker
              selected={filters.registration_to}
              onChange={(date) =>
                setFilters({ ...filters, registration_to: date })
              }
              placeholderText="To"
              minDate={filters.registration_from || new Date()}
              className="border px-2 py-2 rounded-md w-full"
            />
          </div>
        </div>
        {/* Approved Date Range */}
        <div className="flex flex-col w-[260px]">
          <label className="text-sm text-gray-600 mb-1">
            Approved (From – To)
          </label>
          <div className="flex gap-2">
            <DatePicker
              selected={filters.approval_from}
              onChange={(date) =>
                setFilters({ ...filters, approval_from: date })
              }
              placeholderText="From"
              maxDate={new Date()}
              className="border px-2 py-2 rounded-md w-full"
            />
            <DatePicker
              selected={filters.approval_to}
              onChange={(date) => setFilters({ ...filters, approval_to: date })}
              placeholderText="To"
              minDate={filters.approval_from || new Date()}
              className="border px-2 py-2 rounded-md w-full"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResidentSearchFilter;
