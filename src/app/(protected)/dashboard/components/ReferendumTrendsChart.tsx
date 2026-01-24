"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { ReferendumsData } from "@/types/dashboard";

interface Props {
    data: ReferendumsData["trends"];
}

export default function ReferendumTrendsChart({ data }: Props) {
    if (!data || data.length === 0) {
        return <EmptyChart label="No referendum data" />;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis
                    domain={[0, 1]}
                    tickFormatter={(v) => `${Math.round(v * 100)}%`}
                />
                <Tooltip
                    formatter={(value) => {
                        if (typeof value !== "number") return "";
                        return `${Math.round(value * 100)}%`;
                    }}
                />

                <Line
                    type="monotone"
                    dataKey="participation"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
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
