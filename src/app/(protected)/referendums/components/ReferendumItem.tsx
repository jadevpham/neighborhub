"use client";

import { ReferendumData, ReferendumStatus } from "@/types/referendum";
import { referendumStatusMap } from "@/components/StatusBadge";
import { CalendarDays, MapPin, User, CheckCircle } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

interface Props {
  data: ReferendumData;
  onClick?: (id: string) => void;
}

export default function ReferendumItem({ data, onClick }: Props) {
  const statusUI =
    referendumStatusMap[
      (data.status ?? "unknown") as ReferendumStatus | "unknown"
    ];

  return (
    <div
      onClick={() => onClick?.(data.referendum_id)}
      className={`
        cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition
        ${statusUI.border}
        ${statusUI.hover}
      `}
    >
      {/* === HEADER === */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {data.title}
        </h3>

        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusUI.badge}`}
        >
          {statusUI.label}
        </span>
      </div>

      {/* === META INFO === */}
      <div className="mt-3 space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            Site: <b>{data.site_name}</b> · Zone: <b>{data.zone_name}</b>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          <span>Created by {data.creator_name}</span>
        </div>

        <div className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>
            {formatDate(data.created_at)}
          </span>
        </div>
      </div>

      {/* === FOOTER === */}
      <div className="mt-3 flex items-center justify-between">
        {data.user_vote_status && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            <CheckCircle className="h-3.5 w-3.5" />
            Voted
          </span>
        )}
      </div>
    </div>
  );
}
