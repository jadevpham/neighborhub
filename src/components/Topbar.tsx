"use client";

import { Bell, Grid2X2, Search, UserCircle, User, LogOut } from "lucide-react";
import Logo from "./Logo";
import { useMeQuery } from "@/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/hooks/useAuth";
export default function Topbar() {
  const { data } = useMeQuery();
  const user = data?.user;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  // Click ngoài menu sẽ tự đóng
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="bg-emerald-900/15 backdrop-blur-md border-b border-emerald-900/30 flex items-center justify-between px-6 py-3 sticky top-0 z-40 shadow-lg">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Logo withText={true} href="/dashboard" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-md mx-6 bg-white/80 border border-emerald-200 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400">
        <Search size={18} className="text-emerald-600 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent flex-1 text-sm outline-none placeholder-emerald-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Icon thông báo */}
        <button className="relative p-2 hover:bg-emerald-900/10 rounded-xl transition">
          <Bell size={20} className="text-emerald-800" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {/* Avatar + thông tin user */}
        <div ref={dropdownRef} className="relative cursor-pointer select-none">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-emerald-900/10 transition"
          >
            <img
              src={user?.avatar}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full border border-emerald-300 shadow-sm"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-emerald-900">
                {user?.name || "Guest User"}
              </span>
              <span className="text-xs text-emerald-700/70 capitalize">
                {user?.role?.replace("_", " ") || "no role"}
              </span>
            </div>
          </div>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-emerald-100 rounded-lg shadow-lg py-1 z-50 animate-fadeIn">
              <button
                onClick={() => {
                  router.push("/me");
                  setOpen(!open);
                }}
                className="group w-full flex items-center justify-start gap-2 px-4 py-2 text-sm text-emerald-900 hover:bg-emerald-50 transition cursor-pointer"
              >
                <User
                  size={16}
                  className="text-emerald-600 group-hover:text-emerald-800 transition"
                />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  logoutMutation.mutate();
                  setOpen(!open);
                }}
                className="group w-full flex items-center justify-start gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut
                  size={16}
                  className="text-red-500 group-hover:text-red-700 transition"
                />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
