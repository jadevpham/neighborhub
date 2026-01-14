"use client";

import { FacilitySubmitBarProps } from "@/types/facility";
import { useRouter } from "next/navigation";
export default function FacilitySubmitBar({
  mode,
  loading,
  onSubmit,
  facilityId,
}: FacilitySubmitBarProps) {
  const router = useRouter();
  return (
    <div className="mt-6 flex justify-end gap-3 border-t pt-4">
      {/* LEFT ACTION */}
      <div>
        {mode === "update" && facilityId && (
          <button
            type="button"
            onClick={() =>
              router.push(`/facilities/${facilityId}/booking-slots`)
            }
            className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md cursor-pointer"
          >
            Manage booking slots
          </button>
        )}
      </div>
      {/* RIGHT ACTION */}
      <div className="flex gap-3">
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
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          onClick={() => history.back()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
