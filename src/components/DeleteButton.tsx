"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteResource } from "../hooks/useDelete";
import { DeleteButtonProps } from "@/types/common";

export const DeleteButton = ({
  ids,
  resourceName = "item",
  onDeleted,
}: DeleteButtonProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const mutation = useDeleteResource();

  const normalizedIds = Array.isArray(ids) ? ids : [ids];

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync({
        resource: resourceName, // "users", "apartments", ...
        ids: normalizedIds,
      });

      toast.success(
        normalizedIds.length > 1
          ? `${normalizedIds.length} ${resourceName} deleted successfully`
          : `${resourceName} deleted successfully`
      );

      setOpenConfirm(false);
      onDeleted?.();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Delete failed";
      toast.error(msg);
    }
  };

  return (
    <>
      {/* Delete button */}
      <button
        onClick={() => setOpenConfirm(true)}
        disabled={mutation.isPending}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md 
                   text-red-600 border border-red-300 hover:bg-red-50 
                   transition-all disabled:opacity-40"
      >
        <Trash2 className="w-4 h-4" />
        {mutation.isPending ? "Deleting..." : "Delete"}
      </button>

      {/* Confirm modal */}
      {openConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[360px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h3>

            <p className="text-gray-600 mb-6">
              {normalizedIds.length > 1
                ? `Delete ${normalizedIds.length} ${resourceName}?`
                : `Are you sure you want to delete this ${resourceName}?`}
              <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenConfirm(false)}
                className="px-4 py-2 rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={mutation.isPending}
                className="px-4 py-2 rounded-md bg-red-600 text-white 
                           hover:bg-red-700 disabled:opacity-40"
              >
                {mutation.isPending ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
