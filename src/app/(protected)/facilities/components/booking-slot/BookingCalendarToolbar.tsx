// components/booking-slot/BookingCalendarToolbar.tsx
"use client";

import { CalendarViewMode } from "@/constants/calendar";
import { BookingCalendarToolbarProps } from "@/types/bookingSlot";

export default function BookingCalendarToolbar({
  viewMode,
  onViewModeChange,
  from,
  to,
  onDateChange,
  onPrev,
  onNext,
}: BookingCalendarToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <button onClick={onPrev} className="px-3 py-1 border rounded">
          ←
        </button>
        <button onClick={onNext} className="px-3 py-1 border rounded">
          →
        </button>
      </div>

      {/* CENTER */}
      <div className="flex gap-2">
        {(["day", "week", "month"] as CalendarViewMode[]).map((m) => (
          <button
            key={m}
            onClick={() => onViewModeChange(m)}
            className={`px-4 py-1 rounded border ${
              viewMode === m ? "bg-emerald-600 text-white" : "bg-white"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={from}
          onChange={(e) => onDateChange(e.target.value, to)}
          className="border px-2 py-1 rounded"
        />
        <span>→</span>
        <input
          type="date"
          value={to}
          onChange={(e) => onDateChange(from, e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>
    </div>
  );
}
