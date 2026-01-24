"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BookingsData } from "@/types/dashboard";

interface Props {
  data: BookingsData["top_facilities"];
}

export default function FacilityUsageChart({ data }: Props) {
  if (!data || data.length === 0) {
    return <EmptyChart label="No facility usage data" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="facility_name"
          width={120}
        />
        <Tooltip />
        <Bar dataKey="bookings" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-xs text-gray-400">
      {label}
    </div>
  );
}
