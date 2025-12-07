"use client";

import {
  feedbackStatusMap,
  feedbackCategoryMap,
} from "@/components/StatusBadge";
import { FeedbackData } from "@/types/feedback";
import { formatDate } from "@/utils/formatDate";
export default function FeedbackMeta({ fb }: { fb: FeedbackData }) {
  return (
    <div className="bg-white/40 p-4 rounded-2xl shadow-2xl border">
      <h3 className="font-semibold text-emerald-800 mb-3">Meta Information</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium text-emerald-600">Status</p>
          <span
            className={`px-2 py-1 text-xs rounded ${
              feedbackStatusMap[fb.status!].color
            }`}
          >
            {feedbackStatusMap[fb.status!].label}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-emerald-600">Category</p>
          <span
            className={`px-2 py-1 text-xs rounded ${
              feedbackCategoryMap[fb.category ?? "default"].color
            }`}
          >
            {feedbackCategoryMap[fb.category ?? "default"].label}
          </span>
        </div>
        <div>
          <p className="font-medium text-emerald-600">Submitted</p>
          <p className="text-gray-600">{formatDate(fb.updated_at)}</p>
        </div>
        {fb.resident && (
          <>
            <div>
              <p className="font-medium text-emerald-600">Resident</p>

              <div className="flex items-center gap-2 mt-1">
                <img
                  src={
                    fb.resident.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      fb.resident.name || "U"
                    )}&background=E5E7EB&color=374151`
                  }
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  alt={fb.resident.name || "Resident"}
                />

                <div>
                  <p>{fb.resident.name || "No Name"}</p>
                  <p className="text-xs text-gray-500">
                    {fb.resident.zones?.map((z) => z.name).join(", ") ||
                      "No Zone"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
