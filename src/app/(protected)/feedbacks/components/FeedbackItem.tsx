"use client";

import {
  feedbackStatusMap,
  feedbackCategoryMap,
} from "@/components/StatusBadge";
import { FeedbackData } from "@/types/feedback";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

const FeedbackItem = ({ data }: { data: FeedbackData[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.map((item) => (
        <Link
          key={item.id}
          href={`/feedbacks/${item.id}`}
          className={`
            bg-white/40 p-4 rounded-2xl shadow-2xl transition cursor-pointer
            border ${feedbackCategoryMap[item.category ?? 0].border}
            hover:shadow-xl ${feedbackCategoryMap[item.category ?? 0].shadow}
          `}
        >
          {/* TOP ROW */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-emerald-800">
              {item.title || "(No title)"}
            </h2>

            <div className="flex gap-2">
              {/* Status */}
              {item.status !== undefined && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    feedbackStatusMap[item.status].color
                  }`}
                >
                  {feedbackStatusMap[item.status].label}
                </span>
              )}

              {/* Category */}
              {item.category !== undefined && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    feedbackCategoryMap[item.category ?? 0].color
                  }`}
                >
                  {feedbackCategoryMap[item.category ?? 0].label}
                </span>
              )}
            </div>
          </div>

          {/* RESIDENT SECTION */}
          {item.is_anonymous ? (
            <p className="text-gray-500 italic text-sm">Anonymous Resident</p>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={
                  item.resident?.avatar ||
                  "https://ui-avatars.com/api/?name=U&background=E5E7EB&color=374151"
                }
                width={36}
                height={36}
                className="rounded-full object-cover"
                alt=""
              />

              <div>
                <p className="font-medium">{item.resident?.name}</p>
                <p className="text-xs text-gray-500">
                  Zones:{" "}
                  {item.resident?.zones?.map((z) => z.name).join(", ") || "N/A"}
                </p>
              </div>
            </div>
          )}

          {/* DATE */}
          <p className="text-xs text-gray-500 mt-3">
            <span>Created at: {formatDate(item.created_at) || "--"}</span>
            <span className="pl-3">
              Updated at: {formatDate(item.updated_at) || "--"}
            </span>
          </p>
        </Link>
      ))}
    </div>
  );
};

export default FeedbackItem;
