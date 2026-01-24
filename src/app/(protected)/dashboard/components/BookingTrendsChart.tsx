"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { BookingsData } from "@/types/dashboard";

interface Props {
  data: BookingsData["trends"];
}

export default function BookingTrendsChart({ data }: Props) {
  if (!data || data.length === 0) {
    return <EmptyChart label="No booking trend data" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="booked"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="cancelled"
          stroke="#EF4444"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
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
