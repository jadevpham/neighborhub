// Component sử dụng riêng cho page users

// src/components/UserCard.tsx
"use client";
import React from "react";
import { Phone } from "lucide-react";
import { roleColor } from "@/utils/roleColor";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { UserCardProps } from "@/types/user";
const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  const router = useRouter();
  const { user: u, scope: s } = user;
  const handleClick = () => {
    // Nếu đang ở page UserDetail thì không cần navigate
    if (
      typeof window !== "undefined" &&
      window.location.pathname.includes("/userDetail")
    )
      return;
    router.push(`/users/userDetail/${u.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={`relative max-w-sm mx-auto shadow-2xl rounded-2xl overflow-hidden text-center border text-slate-800 w-full flex flex-col justify-between cursor-pointer
     ${
       u.status === 1
         ? "bg-white/50 backdrop-blur-md border-emerald-400/40"
         : "bg-red-50 text-red-500 border-red-200"
     }`}
    >
      {/* === EDIT BUTTON TOP RIGHT === */}
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(); // <-- GỌI LÊN PAGE nơi muốn show popup EditUserModal.tsx lên
          }}
          className="absolute top-2 right-2 z-30 bg-white/90 p-1.5 rounded-full shadow hover:bg-white transition cursor-pointer"
        >
          <Pencil size={16} className="text-emerald-600" />
        </button>
      )}
      {/* Avatar + Status*/}
      <div className="flex justify-center mt-4 relative">
        <img
          src={
            u.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt={u.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />

        <span
          className={`absolute -top-1 -left-2 text-xs font-medium px-2.5 py-0.5 rounded-full
      ${
        u.status === 1
          ? "bg-green-100 text-green-600 border border-green-200"
          : "bg-red-100 text-red-500 border border-red-200"
      }`}
        >
          {u.status === 1 ? "Active" : "Blocked"}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex flex-col items-center -mt-2">
          <h2 className="text-base font-semibold text-gray-900">{u.name}</h2>
          <span className="text-xs text-gray-600 mt-0.5">
            {u.email || "N/A"}
          </span>
        </div>
        <div className="w-10/12 mx-auto my-3 border-t border-gray-300/70"></div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {/* Role badge */}
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              roleColor[u.role] || "bg-gray-100 text-gray-600"
            }`}
          >
            {u.role
              .replaceAll("_", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </span>

          {/* Site / Zone name (hiển thị tùy role) */}
          {(u.role === "site_admin" ||
            u.role === "management_board" ||
            u.role === "partner") && (
            <span className="text-sm text-slate-700">
              {u.role === "site_admin" || u.role === "partner"
                ? s?.site?.name
                : s?.zone?.name}
            </span>
          )}
        </div>

        <div className="mt-5 text-center text-gray-700 text-xs">
          <div className="flex items-center justify-center gap-2">
            <Phone size={16} className="text-slate-400" />
            <span className="text-slate-700">{u.phone || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
