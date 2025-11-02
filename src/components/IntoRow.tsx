import React from "react";
import { InfoRowProps } from "@/types/common"
/**
 * Reusable info row for left card (icon + label + value)
 */
export function InfoRow({ icon, label, value = "—" }: InfoRowProps) {
  return (
    <div className="table w-full">
      <div className="table-row">
        {/* Cột trái: icon + label */}
        <div className="table-cell align-middle pr-4">
          <span className="inline-flex items-center gap-2 h-5 leading-none">
            <span className="inline-flex w-4 h-4 items-center justify-center">
              {/* ép icon vào khung vuông, tránh baseline SVG */}
              {icon}
            </span>
            <span className="font-medium text-emerald-800 text-sm whitespace-nowrap">
              {label}:
            </span>
          </span>
        </div>

        {/* Cột phải: value */}
        <div className="table-cell align-middle text-right">
          <span className="inline-block h-5 leading-none break-all text-sm text-gray-700">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
