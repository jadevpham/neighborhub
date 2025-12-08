"use client";

import { FacilitySubmitBarProps } from "@/types/facility";

export default function FacilitySubmitBar({
  mode,
  loading,
  onSubmit,
}: FacilitySubmitBarProps) {
  return (
    <div className="mt-6 flex justify-end gap-3 border-t pt-4">
      <button
        type="button"
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        onClick={() => history.back()}
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : mode === "create"
          ? "Create Facility"
          : "Update Facility"}
      </button>
    </div>
  );
}
