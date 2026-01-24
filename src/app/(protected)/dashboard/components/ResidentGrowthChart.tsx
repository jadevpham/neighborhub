"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { ResidentsData } from "@/types/dashboard";

interface Props {
  data: ResidentsData["growth"];
}

export default function ResidentGrowthChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-gray-400">
        No data
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#10B981"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
