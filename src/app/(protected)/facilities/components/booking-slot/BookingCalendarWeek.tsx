import { BookingCalendarWeekProps } from "@/types/bookingSlot";
import TimeRow from "./TimeRow";
import { useState } from "react";
import BookingSlotHistoryPanel from "./BookingSlotHistoryPanel";
export default function BookingCalendarWeek({
  slots,
  timeSlots,
  calendarDates,
  stepMinutes,
  forceDayMode,
}: BookingCalendarWeekProps) {
  const ROW_HEIGHT_PER_MIN = 1.5;
  const rowHeightPx = Math.max(36, stepMinutes * ROW_HEIGHT_PER_MIN);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  return (
    <div
      className={`
      border rounded-xl bg-white
      ${forceDayMode ? "overflow-visible" : "overflow-x-auto"}
    `}
    >
      <div
        className="grid relative overflow-visible"
        style={{
          gridTemplateColumns: `80px repeat(${calendarDates.length}, 1fr)`,
          gridAutoRows: `${rowHeightPx}px`,
        }}
      >
        {/* HEADER */}
        <div />
        {calendarDates.map((d) => (
          <div
            key={d.format("YYYY-MM-DD")}
            className="text-center font-semibold py-2 border-b bg-gray-50"
          >
            <div>{d.format("ddd")}</div>
            <div className="text-xs text-gray-500">{d.format("DD/MM")}</div>
          </div>
        ))}

        {/* BODY */}
        {timeSlots.map((time) => (
          <TimeRow
            key={time}
            time={time}
            slots={slots}
            calendarDates={calendarDates}
            stepMinutes={stepMinutes}
            onSlotClick={(slotId) => setSelectedSlotId(slotId)}
          />
        ))}
        {selectedSlotId && (
          <BookingSlotHistoryPanel
            slot_id={selectedSlotId}
            onClose={() => setSelectedSlotId(null)}
          />
        )}
      </div>
    </div>
  );
}
