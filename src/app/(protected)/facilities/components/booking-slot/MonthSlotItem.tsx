// item dùng cho MONTH (không absolute như SlotCard)

import dayjs from "dayjs";
import { bookingSlotStatusMap } from "@/components/StatusBadge";
import { BookingSlotData } from "@/types/bookingSlot";
function parseBEToLocal(input?: string | null) {
  if (!input) return null;

  const m = input.match(/^(\d{2})-(\d{2})-(\d{4})T(\d{2}):(\d{2}):(\d{2})Z$/);
  if (!m) return null;

  const [, dd, mm, yyyy, HH, MM, SS] = m;

  const utcDate = new Date(
    Date.UTC(
      Number(yyyy),
      Number(mm) - 1,
      Number(dd),
      Number(HH),
      Number(MM),
      Number(SS)
    )
  );

  // dayjs(Date) => local time
  return dayjs(utcDate);
}
function formatHM(d?: dayjs.Dayjs | null) {
  if (!d) return "—";
  return d.format("HH:mm");
}

function getStatusInfo(status?: number | null) {
  const key = status === null || status === undefined ? "null" : String(status);
  return (bookingSlotStatusMap as any)[key];
}
export function MonthSlotItem({ slot }: { slot: BookingSlotData }) {
  const start = parseBEToLocal(slot.start);
  const end = parseBEToLocal(slot.end);
  const statusInfo = getStatusInfo(slot.status);

  return (
    <div
      className={[
        "rounded-md border px-2 py-1 text-xs",
        statusInfo?.color,
      ].join(" ")}
      title={`${slot.actor?.name ?? "—"} | ${formatHM(start)}-${formatHM(end)}`}
    >
      <div className="font-medium truncate">
        {slot.actor?.name || (slot.status === 0 ? "Blocked" : "—")}
      </div>
      <div className="opacity-70">
        {formatHM(start)}–{formatHM(end)}
      </div>
    </div>
  );
}
