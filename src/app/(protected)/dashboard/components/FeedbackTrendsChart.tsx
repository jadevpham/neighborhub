"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { FeedbacksData } from "@/types/dashboard";

interface Props {
  data: FeedbacksData["trends"];
}

export default function FeedbackTrendsChart({ data }: Props) {
  if (!data || data.length === 0) {
    return <EmptyChart label="No feedback trend data" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="average_rating"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ r: 3 }}
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
