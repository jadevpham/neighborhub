"use client";

import React from "react";
import { facilityStatusMap } from "@/components/StatusBadge";
import { FacilitySearchFilterProps } from "@/types/facility";
import { useFacilityTypeListQuery } from "@/hooks/useFacility";

const FacilitySearchFilter: React.FC<FacilitySearchFilterProps> = ({
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
        name === "status" || name === "type_id"
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
      status: undefined,
      type_id: "",
    };

    onFilterChange(cleared);
  };

  const { data: typeRes } = useFacilityTypeListQuery();
  const facilityTypes = typeRes?.data ?? [];

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
          placeholder="Search by facility name or description."
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
          {Object.keys(facilityStatusMap)
            .filter((key) => key !== "default")
            .map((key) => (
              <option key={key} value={key}>
                {facilityStatusMap[Number(key)].label}
              </option>
            ))}
        </select>
      </div>

      {/* Type */}
      <div className="flex flex-col min-w-[180px]">
        <label className="text-sm text-gray-700 mb-1">Facility Type</label>

        <select
          name="type_id"
          value={filters.type_id ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All</option>

          {facilityTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
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

export default FacilitySearchFilter;
