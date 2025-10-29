"use client";

import Image from "next/image";
import { useMeQuery } from "@/hooks/useAuth";

export default function MePage() {
  const { data, isLoading, isError } = useMeQuery();
  const user = data?.user;
  const scope = data?.scope;

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-emerald-800">
        Đang tải thông tin...
      </div>
    );

  if (isError || !user)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Không thể tải thông tin người dùng
      </div>
    );

  return (
    <div className="min-h-screen bg-emerald-900/15 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-emerald-100">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="avatar"
              fill
              className="rounded-full object-cover border-4 border-emerald-300"
            />
          </div>
          <h1 className="text-xl font-semibold text-emerald-900">{user.name}</h1>
          <p className="text-emerald-600">{user.title || "—"}</p>
          <p className="text-sm text-gray-500 mt-2">{user.email}</p>

          <div className="w-full mt-6 border-t border-emerald-100 pt-4 text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-emerald-800">Số điện thoại:</span>
              <span>{user.phone || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-emerald-800">Giới tính:</span>
              <span>{user.gender || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-emerald-800">Ngày sinh:</span>
              <span>{user.dob || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-emerald-800">Vai trò:</span>
              <span className="capitalize">{user.role.replace("_", " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-emerald-800">Trạng thái:</span>
              <span>
                {user.status === 1
                  ? "Active"
                  : user.status === 0
                  ? "Blocked"
                  : "Deleted"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-emerald-800">Tham gia từ:</span>
              <span>{new Date(user.joined_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
