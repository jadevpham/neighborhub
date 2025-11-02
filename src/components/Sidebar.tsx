"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Building2,
  MapPin,
  Calendar,
  Newspaper,
} from "lucide-react";
import clsx from "clsx";
import { useMeQuery } from "@/hooks/useAuth";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    role: ["system_admin", "site_admin", "management_board"],
  },
  { name: "Sites", href: "/sites", icon: Building2, role: ["system_admin"] },
  { name: "Zones", href: "/zones", icon: MapPin, role: ["site_admin"] },
  {
    name: "Residents",
    href: "/residents",
    icon: Users,
    role: ["management_board"],
  },
  {
    name: "Events",
    href: "/events",
    icon: Calendar,
    role: ["site_admin", "management_board"],
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
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
  const { data, isLoading, isError } = useMeQuery();
  const role = data?.user?.role;
  const siteName = data?.scope?.site?.name;
  const zoneName = data?.scope?.zone?.name;
  console.log("Sidebar role:", role);

  if (isLoading)
    return (
      <aside className="w-60 bg-white border-r flex items-center justify-center text-sm text-emerald-700/70">
        Loading...
      </aside>
    );

  return (
    <aside className="w-60 bg-emerald-900/15 backdrop-blur border-r border-emerald-100/40 min-h-screen sticky top-[64px] flex flex-col shadow-xl">
      {/* Header */}
      {role === "site_admin" && (
        <div className="mt-4 px-6 py-3 border-b border-emerald-100/40">
          <h2 className="text-lg font-semibold text-emerald-900 tracking-tight">
            {siteName || "—"}
          </h2>
        </div>
      )}

      {role === "management_board" && (
        <div className="mt-4 px-6 py-3 border-b border-emerald-100/40">
          <h2 className="text-lg font-semibold text-emerald-900 tracking-tight">
            {siteName || "—"}
          </h2>
          <p className="text-xs text-emerald-700/70 mt-1">{zoneName || "—"}</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-3 mt-4">
        {menu
          .filter((item) => item.role.includes(role))
          .map((item) => {
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
                  className={clsx(
                    active ? "text-emerald-700" : "text-emerald-800/80"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
      </nav>

      {/* Footer */}
      <div className="bg-emerald-50/20 backdrop-blur-sm border-t border-emerald-100/40 px-5 py-3 text-xs text-emerald-700/70 shadow-[0_-4px_10px_rgba(16,185,129,0.05)]">
        <p>
          Role: <span className="font-semibold">{role ?? "—"}</span>
        </p>
      </div>
    </aside>
  );
}
