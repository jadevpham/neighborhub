"use client";

import React from "react";

export const Tabs = ({ tabs, active, onChange }: any) => (
  <div className="flex border-b border-emerald-200 mb-6">
    {tabs.map((tab: string) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-2 -mb-[1px] border-b-2 text-sm font-medium transition 
          ${
            active === tab
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-emerald-600 hover:border-emerald-200"
          }
        `}
      >
        {tab}
      </button>
    ))}
  </div>
);
