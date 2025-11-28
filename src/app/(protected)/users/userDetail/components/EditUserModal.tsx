"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUpdateUser } from "@/hooks/useUsers";
import { EditUserModalProps } from "@/types/user";
export function EditUserModal({
  id,
  userInfo,
  onClose,
  onSaved,
}: EditUserModalProps) {
  const [email, setEmail] = useState(userInfo.email || "");
  const [status, setStatus] = useState(userInfo.status?.toString() || "1");

  const updateUser = useUpdateUser();

  const handleSave = async () => {
    try {
      await updateUser.mutateAsync({
        id,
        payload: {
          email,
          status: Number(status),
        },
      });

      toast.success("User updated successfully!");
      onSaved?.();
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[380px] shadow-xl animate-fadeIn">
        <h3 className="text-lg font-semibold text-emerald-700 mb-4">
          Edit User
        </h3>

        {/* Email */}
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Status */}
        <label className="block text-sm text-gray-600 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-6"
        >
          <option value="1">Active</option>
          <option value="0">Blocked</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={updateUser.isPending}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            {updateUser.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
