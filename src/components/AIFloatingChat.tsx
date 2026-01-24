"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AIChatBox from "./AIChatBox";

export default function AIFloatingChat() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-emerald-600 text-white shadow-2xl"
        title="AI Assistant"
      >
        🤖
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[420px] max-h-[70vh] overflow-hidden rounded-2xl border bg-white/90 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-sm">✕</button>
          </div>
          <AIChatBox />
        </div>
      )}
    </>,
    document.body
  );
}
