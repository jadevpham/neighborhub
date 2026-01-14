import dayjs from "dayjs";
import { BookingCalendarMonthProps, BookingSlotData } from "@/types/bookingSlot";
// nếu bạn có map ở đây
import { MonthSlotItem } from "./MonthSlotItem";
// Parse đúng format BE: DD-MM-YYYYTHH:mm:ssZ
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

export default function BookingCalendarMonth({
  slots,
  calendarDates,
}: BookingCalendarMonthProps) {
  // group slot theo ngày (YYYY-MM-DD) + dedupe theo id
  const slotMap = slots.reduce<Record<string, BookingSlotData[]>>((acc, s) => {
    const startLocal = parseBEToLocal(s.start);
    if (!startLocal) return acc;

    const key = startLocal.format("YYYY-MM-DD");
    if (!acc[key]) acc[key] = [];

    // dedupe theo id
    if (s.id && acc[key].some((x) => x.id === s.id)) return acc;

    acc[key].push(s);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-7 gap-4">
      {calendarDates.map((date) => {
        const key = date.format("YYYY-MM-DD");
        const daySlots = slotMap[key] || [];

        // sort theo start time
        daySlots.sort((a, b) => {
          const sa = parseBEToLocal(a.start)?.valueOf() ?? 0;
          const sb = parseBEToLocal(b.start)?.valueOf() ?? 0;
          return sa - sb;
        });

        return (
          <div key={key} className="rounded-xl border p-3 min-h-[120px]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">
                {date.format("DD/MM")}
              </div>
              {daySlots.length > 0 && (
                <div className="text-xs text-gray-500">
                  {daySlots.length} slots
                </div>
              )}
            </div>

            {daySlots.length === 0 ? (
              <p className="text-xs text-gray-400">No booking</p>
            ) : (
              <div className="space-y-2">
                {daySlots.slice(0, 3).map((slot) => (
                  <MonthSlotItem
                    key={slot.id ?? `${key}-${slot.start}`}
                    slot={slot}
                  />
                ))}

                {daySlots.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{daySlots.length - 3} more…
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
