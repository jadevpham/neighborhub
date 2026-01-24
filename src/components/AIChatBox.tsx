"use client";

import { useState } from "react";
import { sendAIMessage } from "@/services/chatbot";

export default function AIChatBox() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = msg.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setMsg("");
    setLoading(true);

    try {
      const data = await sendAIMessage({ message: text });
      setMessages((prev) => [...prev, { from: "ai", text: data.answer }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { from: "ai", text: `❌ ${e.message}` }]);
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
              m.from === "user" ? "ml-auto w-fit bg-emerald-600 text-white" : "mr-auto w-fit bg-gray-100 text-gray-800",
            ].join(" ")}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="text-xs text-gray-500">AI đang trả lời...</div>}
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
