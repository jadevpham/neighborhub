"use client";
import React, { useState, useEffect } from "react";
import { useMeMutation } from "@/hooks/useAuth";
import { EditProfileModalProps } from "@/types/common";
import { toast } from "sonner";
import { buildUpdateMeFormData } from "@/utils/buildUpdateMeFormData";
import { formatDobForBE } from "@/utils/formatDate";
export default function EditProfileModal({
  open,
  onClose,
  initialData,
}: EditProfileModalProps) {
  const [form, setForm] = useState(initialData || {});
  const meMutation = useMeMutation();

  useEffect(() => {
    if (open) setForm(initialData || {});
  }, [open, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Lọc ra các field thay đổi
    const changedFields = Object.keys(form).reduce((acc, key) => {
      const currentValue = form[key as keyof typeof form];
      const initialValue = initialData?.[key as keyof typeof form];
      if (currentValue !== initialValue) {
        if (key === "dob" && currentValue) {
          acc[key] = formatDobForBE(currentValue); // convert date format
        } else {
          acc[key] = currentValue;
        }
      }
      return acc;
    }, {} as Record<string, any>);

    // Không có thay đổi
    if (Object.keys(changedFields).length === 0) {
      toast.info("No information has been changed!", { duration: 3000 });
      onClose();
      return;
    }

    // Gọi API update
    // meMutation.mutate(changedFields, {
    //   onSuccess: () => {
    //     toast.success("Profile updated successfully!", { duration: 5000 });
    //     onClose();
    //   },

    //   onError: (err: any) => {
    //     const api = err.response?.data;

    //     // Cuộn lên top để toast nhìn thấy
    //     window.scrollTo({ top: 0, behavior: "smooth" });

    //     // Trường hợp: BE trả message đơn
    //     if (api?.message) {
    //       toast.error(api.message, { duration: 5000 });
    //       return;
    //     }

    //     // Trường hợp: nhiều lỗi trong errors object
    //     if (api?.errors && typeof api.errors === "object") {
    //       Object.values(api.errors).forEach((errList: any) => {
    //         if (Array.isArray(errList)) {
    //           errList.forEach((msg) => toast.error(msg, { duration: 5000 }));
    //         } else {
    //           toast.error(errList, { duration: 5000 });
    //         }
    //       });
    //       return;
    //     }

    //     // Fallback
    //     toast.error("Update failed", { duration: 5000 });
    //   },
    // });

    const payload = buildUpdateMeFormData(changedFields);

    meMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Profile updated successfully!", { duration: 5000 });
        onClose();
      },

      onError: (err: any) => {
        const api = err.response?.data;
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (api?.message) {
          toast.error(api.message);
          return;
        }

        if (api?.errors && typeof api.errors === "object") {
          Object.values(api.errors).forEach((errList: any) => {
            if (Array.isArray(errList)) {
              errList.forEach((msg) => toast.error(msg));
            } else {
              toast.error(errList);
            }
          });
          return;
        }

        toast.error("Update failed");
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold text-emerald-800 mb-4">
          Edit Profile
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-600">Full Name</label>
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Phone</label>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Gender</label>
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Title</label>
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={meMutation.isPending}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
            >
              {meMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
