"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { EventsData } from "@/types/dashboard";

interface Props {
  data: EventsData["by_month"];
}

export default function EventByMonthChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <EmptyChart label="No event data" />
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="events" fill="#3B82F6" radius={[6, 6, 0, 0]} />
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
