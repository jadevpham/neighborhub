"use client";

import { FeedbackData } from "@/types/feedback";
import { formatDate } from "@/utils/formatDate";
export default function FeedbackContent({ fb }: { fb: FeedbackData }) {
  return (
    <div className="bg-white/40 p-5 rounded-2xl shadow-2xl border">
      <h3 className="text-lg font-semibold text-emerald-800">{fb.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{formatDate(fb.created_at)}</p>
      <p className="whitespace-pre-line leading-relaxed text-gray-700">
        {fb.content}
      </p>
    </div>
  );
}
