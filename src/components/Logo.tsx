"use client";

import React from "react";
import Link from "next/link";
import { AppLogoProps } from "@/types/common";
/**
 * 🌿 AppLogo – Logo tái sử dụng toàn hệ thống
 * ------------------------------------------
 * - Dùng được trong Topbar, Sidebar, Login, Footer...
 * - Có thể truyền props `size`, `withText`, `href`
 */

export default function Logo({
  size = 24,
  withText = true,
  href,
  circleSize = 44,
}: AppLogoProps) {
  const logo = (
    <div className="flex items-center gap-2 font-semibold text-emerald-900">
      {/* 🌿 Icon trong vòng tròn */}
      <div
        className="flex items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm hover:shadow-md transition-all duration-200"
        style={{
          width: circleSize,
          height: circleSize,
        }}
      >
        <span style={{ fontSize: size }}>🌿</span>
      </div>
      {/* Text bên cạnh */}
      {withText && (
        <span className="tracking-tight text-emerald-900 text-lg">
          Neighborhub System
        </span>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="hover:opacity-90 transition">
      {logo}
    </Link>
  ) : (
    logo
  );
}
