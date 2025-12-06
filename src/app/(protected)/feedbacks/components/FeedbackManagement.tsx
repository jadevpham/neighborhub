"use client";

import { feedbackPriorityMap } from "@/components/StatusBadge";
import { FeedbackData } from "@/types/feedback";

export default function FeedbackManagement({ fb }: { fb: FeedbackData }) {
  const priority = feedbackPriorityMap[fb.priority ?? 0];

  return (
    <div className="bg-white/40 p-4 rounded-2xl shadow-2xl border">
      <h3 className="font-semibold text-gray-700 mb-3">Management</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium">Priority</p>
          <span className={`px-2 py-1 text-xs rounded ${priority.color}`}>
            {priority.label}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">Anonymous</p>
          <p>{fb.is_anonymous ? "Yes" : "No"}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">Assigned to</p>
          <p>Maintenance Team</p>
        </div>
      </div>
    </div>
  );
}
