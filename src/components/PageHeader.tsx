"use client";

import React from "react";
import BackButton from "./BackButton";
import { PageHeaderProps } from "@/types/common";

export default function PageHeader({
  title,
  subtitle,
  showBack = true,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mt-2 flex items-center justify-between mb-8 ${className}`}>
      <div className="flex items-start gap-4">
        {showBack && <BackButton />}

        <div>
          <h1 className="text-2xl font-semibold text-emerald-800">{title}</h1>

          {subtitle && (
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {/* ACTIONS RIGHT */}
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
