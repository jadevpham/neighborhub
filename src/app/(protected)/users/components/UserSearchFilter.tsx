"use client";
import React, { useState } from "react";
import { UserSearchFilterProps } from "@/types/user"; // ✅ import từ file ui.ts
import { useRouter } from "next/navigation";
import StatusSelect from "@/components/StatusSelect";
const UserSearchFilter: React.FC<UserSearchFilterProps> = ({
  currentRole,
  sites = [],
  zones = [],
  onFilterChange,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    role: "",
    site_id: "",
    zone_id: "",
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
      ...filters,
      status: filters.status ? Number(filters.status) : null,
    });
  };

  const handleClear = () => {
    const cleared = {
      search: "",
      status: null,
      role: "",
      site_id: "",
      zone_id: "",
    };
    setFilters({
      search: "",
      status: "",
      role: "",
      site_id: "",
      zone_id: "",
    });
    onFilterChange(cleared);
  };

  const isSystemAdmin = currentRole === "system_admin";
  const isSiteAdmin = currentRole === "site_admin";

  const router = useRouter();

  return (
    <div className="mb-6">
      {/* === LEFT: Filter Form === */}
      <form
        onSubmit={handleSearch}
        className="bg-white border border-emerald-100 p-4 mb-6 rounded-lg shadow-sm flex flex-wrap gap-3 items-end"
      >
        {/* Search */}
        <div className="flex flex-col flex-1 min-w-[220px]">
          <label className="text-sm text-gray-600 mb-1">Search</label>
          <input
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search name, phone, or email..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col min-w-[140px]">
          <label className="text-sm text-gray-600 mb-1">Status</label>
          <StatusSelect
            name="status"
            value={filters.status}
            onChange={handleChange}
            type="user"
            allowedStatuses={[1, 0]} // Active, Blocked
          />
        </div>

        {/* Role (system_admin only) */}
        {isSystemAdmin && (
          <div className="flex flex-col min-w-[160px]">
            <label className="text-sm text-gray-600 mb-1">Role</label>
            <select
              name="role"
              value={filters.role}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">All</option>
              <option value="site_admin">Site Admin</option>
              <option value="partner">Partner</option>
            </select>
          </div>
        )}

        {/* Site (system_admin only) */}
        {isSystemAdmin && (
          <div className="flex flex-col min-w-[180px]">
            <label className="text-sm text-gray-600 mb-1">Site</label>
            <select
              name="site_id"
              value={filters.site_id}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">All</option>
              {sites.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Zone (site_admin only) */}
        {isSiteAdmin && (
          <div className="flex flex-col min-w-[180px]">
            <label className="text-sm text-gray-600 mb-1">Zone</label>
            <select
              name="zone_id"
              value={filters.zone_id}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">All</option>
              {zones.map((z) => (
                <option key={z.value} value={z.value}>
                  {z.label}
                </option>
              ))}
            </select>
          </div>
        )}

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
            onClick={() => router.push("/users/userCreate")}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            + Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSearchFilter;