// components/FacilityTypeModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CreateUpdateFacilityTypeModalPopupProps } from "@/types/facility";

export default function FacilityTypeModalPopup({
  open,
  initialName = "",
  title,
  confirmLabel,
  loading,
  onConfirm,
  onClose,
}: CreateUpdateFacilityTypeModalPopupProps) {
  const [name, setName] = useState(initialName);

  // Khi initialName thay đổi → reset input
  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <label className="text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter facility type name"
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(name)}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
