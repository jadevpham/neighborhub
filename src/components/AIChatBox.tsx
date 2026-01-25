"use client";

import { useState } from "react";
import { sendAIMessage } from "@/services/chatbot";

import { useEventListQuery } from "@/hooks/useEvent";
import { useFacilityListQuery } from "@/hooks/useFacility";
import { useNewsListQuery } from "@/hooks/useNews";
import { useFeedbackListQuery } from "@/hooks/useFeedback";
import { useReferendumListQuery } from "@/hooks/useReferendum";
import { useUsersQuery } from "@/hooks/useUsers";
import { useSitesQuery } from "@/hooks/useSites";
import { useZonesQuery } from "@/hooks/useZones";

export default function AIChatBox() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // PARAM CHO HOOK (BẮT BUỘC)
  const listParam = {
    page: 1,
    limit: 100,
  };

  const facilityParam = {
    search: null,
    status: 1,      // ví dụ: 1 = active
    type_id: null,
  };

  const eventParam = {
    page: 1,
    limit: 100,
  
    search: null,
    status: null,        // ví dụ: 1 = published / active
    start_date: null,
    end_date: null,
  };
  
  const referendumParam = {
    page: 1,
    limit: 100,
    search: null,
    status: null,
  };

  // GỌI HOOK CÓ PARAM
  const { data: events } = useEventListQuery(eventParam);
  const { data: facilities } = useFacilityListQuery(facilityParam);
  const { data: news } = useNewsListQuery(listParam);
  const { data: feedbacks } = useFeedbackListQuery(listParam);
  const { data: referendums } = useReferendumListQuery(referendumParam);
  const { data: users } = useUsersQuery(listParam);
  const { data: sites } = useSitesQuery();
  const { data: zones } = useZonesQuery(listParam);


  const send = async () => {
    const text = msg.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setMsg("");
    setLoading(true);

    try {
      const data = await sendAIMessage({
        message: text,
        contextData: {
          events: events?.data ?? [],
          facilities: facilities?.data ?? [],
          news: news?.data ?? [],
          feedbacks: feedbacks?.data ?? [],
          referendums: referendums?.data ?? [],
          users: users?.data ?? [],
          sites: sites?.data ?? [],
          zones: zones?.data ?? [],
        },
      });

      setMessages((prev) => [...prev, { from: "ai", text: data.answer }]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: `❌ ${e.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="h-72 overflow-y-auto rounded-xl border bg-white/70 p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={[
              "mb-2 rounded-lg px-3 py-2 text-sm",
              m.from === "user"
                ? "ml-auto w-fit bg-emerald-600 text-white"
                : "mr-auto w-fit bg-gray-100 text-gray-800",
            ].join(" ")}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-gray-500">AI đang trả lời...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
          placeholder="Hỏi AI..."
        />
        <button
          onClick={send}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-60"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
