import { TimeRowProps } from "@/types/bookingSlot";
import SlotCard from "./SlotCard";
import dayjs from "dayjs";

/**
 * BE datetime format: DD-MM-YYYYTHH:mm:ssZ
 */
function parseBEToLocal(input?: string | null) {
  if (!input) return null;

  // BE: DD-MM-YYYYTHH:mm:ssZ
  const m = input.match(/^(\d{2})-(\d{2})-(\d{4})T(\d{2}):(\d{2}):(\d{2})Z$/);
  if (!m) return null;

  const [, dd, mm, yyyy, HH, MM, SS] = m;

  // tạo Date theo UTC
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
  return dayjs(utcDate); // local time
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function TimeRow({
  time,
  slots,
  calendarDates,
  stepMinutes,
  onSlotClick,
}: TimeRowProps) {
  const rowStartMinutes = timeToMinutes(time);
  const rowEndMinutes = rowStartMinutes + stepMinutes;

  return (
    <>
      <div className="text-xs text-gray-500 py-6 border-r text-center">
        {time}
      </div>

      {calendarDates.map((date) => {
        const slot = slots.find((s) => {
          if (!s.start) return false;

          const startLocal = parseBEToLocal(s.start);
          if (!startLocal) return false;

          // FIX 1: khóa slot theo đúng ngày của column
          if (!startLocal.isSame(date, "day")) return false;

          const slotMinutesInDay = startLocal.hour() * 60 + startLocal.minute();

          // FIX 2: match slot vào row
          return (
            slotMinutesInDay >= rowStartMinutes &&
            slotMinutesInDay < rowEndMinutes
          );
        });

        return (
          <div key={date.format("YYYY-MM-DD")} className="border relative">
            {slot && (
              <SlotCard
                slot={slot}
                onClick={() => {
                  if (!slot.id) return;
                  onSlotClick(slot.id);
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
export function buildTimeSlots(
  openingTime: string,
  closingTime: string,
  stepMinutes: number
): string[] {
  const [oh, om] = openingTime.split(":").map(Number);
  const [ch, cm] = closingTime.split(":").map(Number);

  const start = oh * 60 + om;
  const end = ch * 60 + cm;

  const res: string[] = [];
  for (let t = start; t < end; t += stepMinutes) {
    const hh = String(Math.floor(t / 60)).padStart(2, "0");
    const mm = String(t % 60).padStart(2, "0");
    res.push(`${hh}:${mm}`);
  }
  return res;
}
