"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Building2,
  Calendar,
  Newspaper,
  ChevronDown,
  Home,
  MessageCircle,
  CalendarCheck,
  DoorOpen,
  Vote,
} from "lucide-react";
import clsx from "clsx";
import { useMeQuery } from "@/hooks/useAuth";
import { useState } from "react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    role: ["system_admin", "site_admin", "management_board"],
  },
  {
    name: "Users",
    href: "/users",
    icon: Building2,
    role: ["system_admin", "site_admin"],
  },
  {
    name: "Residents",
    href: "/residents",
    icon: Users,
    role: ["site_admin", "management_board"],
  },
  {
    name: "Events",
    href: "/events",
    icon: Calendar,
    role: ["site_admin", "management_board", "partner"],
  },
  {
    name: "Apartments",
    href: "/apartments",
    icon: Home, 
    role: ["site_admin", "management_board"],
  },
  {
    name: "Feedbacks",
    href: "/feedbacks",
    icon: MessageCircle, 
    role: ["site_admin", "management_board"],
  },
  // {
  //   name: "My Events",
  //   href: "/my-events",
  //   icon: CalendarCheck,
  //   role: ["partner"],
  // },
  {
    name: "Facilities",
    href: "/facilities",
    icon: DoorOpen, 
    role: ["site_admin", "management_board"],
  },
  {
    name: "Referendums", 
    href: "/referendums",
    icon: Vote,
    role: ["site_admin", "management_board"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    role: ["system_admin"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data, isLoading } = useMeQuery();

  const role = data?.user?.role;
  const siteName = data?.scope?.site?.name;
  const zoneName = data?.scope?.zone?.name;

  const [openNewsMenu, setOpenNewsMenu] = useState(false);

  if (isLoading)
    return (
      <aside className="w-60 bg-white border-r flex items-center justify-center text-sm text-emerald-700/70">
        Loading...
      </aside>
    );

  return (
    <aside className="w-60 bg-emerald-900/15 backdrop-blur border-r border-emerald-100/40 min-h-screen sticky top-[64px] flex flex-col shadow-xl">
      {/* ======== HEADER ======== */}
      {(role === "site_admin" || role === "management_board") && (
        <div className="mt-4 px-6 py-3 border-b border-emerald-100/40">
          <h2 className="text-lg font-semibold text-emerald-900 tracking-tight">
            {siteName || "—"}
          </h2>

          {role === "management_board" && (
            <p className="text-xs text-emerald-700/70 mt-1">
              {zoneName || "—"}
            </p>
          )}
        </div>
      )}

      {/* ======== NAVIGATION ======== */}
      <nav className="flex-1 flex flex-col gap-1 p-3 mt-4">
        {/* Render menu (ngoại trừ News) */}
        {menu
          .filter((item) => item.role.includes(role))
          .map((item) => {
            if (item.name === "News") return null; // skip
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-emerald-100 text-emerald-900 shadow-sm"
                    : "text-emerald-800 hover:bg-emerald-900/10 hover:text-emerald-950"
                )}
              >
                <Icon
                  size={18}
                  className={
                    active ? "text-emerald-700" : "text-emerald-800/80"
                  }
                />
                {item.name}
              </Link>
            );
          })}

        {/* ======== NEWS MENU (FOR site_admin + management_board) ======== */}
        {(role === "site_admin" || role === "management_board") && (
          <div>
            {/* header */}
            <button
              onClick={() => setOpenNewsMenu((prev) => !prev)}
              className={clsx(
                "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                pathname.startsWith("/news")
                  ? "bg-emerald-100 text-emerald-900 shadow-sm"
                  : "text-emerald-800 hover:bg-emerald-900/10 hover:text-emerald-950"
              )}
            >
              <span className="flex items-center gap-3">
                <Newspaper size={18} />
                News
              </span>
              <ChevronDown
                size={16}
                className={clsx(
                  "transition-transform",
                  openNewsMenu && "rotate-180"
                )}
              />
            </button>

            {/* sub menu */}
            {openNewsMenu && (
              <div className="ml-10 mt-1 flex flex-col gap-1">
                <Link
                  href="/news?scope=site"
                  className={clsx(
                    "text-sm px-3 py-1.5 rounded-md",
                    pathname.includes("scope=site")
                      ? "bg-emerald-200 text-emerald-900"
                      : "text-emerald-800 hover:bg-emerald-900/10"
                  )}
                >
                  Site News
                </Link>

                <Link
                  href="/news?scope=zone"
                  className={clsx(
                    "text-sm px-3 py-1.5 rounded-md",
                    pathname.includes("scope=zone")
                      ? "bg-emerald-200 text-emerald-900"
                      : "text-emerald-800 hover:bg-emerald-900/10"
                  )}
                >
                  Zone News
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ======== FOOTER ======== */}
      <div className="bg-emerald-50/20 backdrop-blur-sm border-t border-emerald-100/40 px-5 py-3 text-xs text-emerald-700/70 shadow-[0_-4px_10px_rgba(16,185,129,0.05)]">
        <p>
          Role: <span className="font-semibold">{role ?? "—"}</span>
        </p>
      </div>
    </aside>
  );
}
