"use client";

import { FeedbackData } from "@/types/feedback";
import { formatDate } from "@/utils/formatDate";

export default function FeedbackActivityLog({ fb }: { fb: FeedbackData }) {
  return (
    <div className="bg-white/40 p-4 rounded-2xl shadow-2xl border">
      <h3 className="font-semibold text-emerald-800 mb-3">Activity Log</h3>

      <div className="space-y-4 text-sm">
        {fb.activity_logs?.length ? (
          fb.activity_logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              {/* Colored dot */}
              <span
                className={`w-2 h-2 rounded-full mt-1 
                  ${index === 0 ? "bg-blue-500" : "bg-green-500"}
                `}
              ></span>

              <div>
                <p className="font-medium">{log.activity_name}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(log.performed_at)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No activity logs</p>
        )}
      </div>
    </div>
  );
}
