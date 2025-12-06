"use client";

import { useState } from "react";
import { useUpdateFeedbackMutation } from "@/hooks/useFeedback";
import {
  feedbackCategoryMap,
  feedbackPriorityMap,
} from "@/components/StatusBadge";
import { FeedbackData } from "@/types/feedback";
import { toast } from "sonner";

interface Props {
  feedback: FeedbackData;
}

export default function UpdateFeedbackForm({ feedback }: Props) {
  const updateMutation = useUpdateFeedbackMutation();

  const [category, setCategory] = useState<number | null>(
    feedback.category ?? null
  );
  const [priority, setPriority] = useState<number | null>(
    feedback.priority ?? null
  );

  const handleSubmit = () => {
    if (category === null || priority === null) {
      toast.error("Please select both Category and Priority");
      return;
    }

    updateMutation.mutate({
      id: feedback.id!,
      payload: {
        category,
        priority,
      },
    });
  };

  return (
    <div className="bg-white/40 p-4 rounded-2xl shadow-2xl border space-y-5">
      <h3 className="font-semibold text-gray-800 mb-2">
        Update Feedback Settings
      </h3>

      {/* CATEGORY */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Category</label>
        <select
          className="border rounded-lg px-3 py-2"
          value={category ?? ""}
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          <option value="">Select category</option>
          {Object.keys(feedbackCategoryMap)
            .filter((key) => key !== "default")
            .map((key) => (
              <option key={key} value={key}>
                {feedbackCategoryMap[Number(key)].label}
              </option>
            ))}
        </select>
      </div>

      {/* PRIORITY */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Priority</label>
        <select
          className="border rounded-lg px-3 py-2"
          value={priority ?? ""}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value="">Select priority</option>
          {Object.keys(feedbackPriorityMap)
            .filter((key) => key !== "default")
            .map((key) => (
              <option key={key} value={key}>
                {feedbackPriorityMap[Number(key)].label}
              </option>
            ))}
        </select>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={updateMutation.isPending}
        className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
      >
        {updateMutation.isPending ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
