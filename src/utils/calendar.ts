// utils/calendar.ts
import dayjs from "dayjs";
export function generateTimeSlots(
    openingTime: string,   // "08:00"
    closingTime: string,   // "20:00"
    stepMinutes: number
  ): string[] {
    const [openH, openM] = openingTime.split(":").map(Number);
    const [closeH, closeM] = closingTime.split(":").map(Number);
  
    // ⚠️ DÙNG NGÀY GIẢ – KHÔNG UTC – KHÔNG LOCAL CONVERT
    let current = dayjs()
      .hour(openH)
      .minute(openM)
      .second(0);
  
    const end = dayjs()
      .hour(closeH)
      .minute(closeM)
      .second(0);
  
    const slots: string[] = [];
  
    while (current.isBefore(end)) {
      slots.push(current.format("HH:mm"));
      current = current.add(stepMinutes, "minute");
    }
  
    return slots;
  }
//   import dayjs from "dayjs";

/**
 * Build list date cho WEEK view
 * Tuần bắt đầu từ Monday (ISO)
 */
export function buildWeekDates(from: string): dayjs.Dayjs[] {
  const start = dayjs(from).startOf("week"); // nếu muốn Mon, đổi sang startOf("isoWeek")
  const dates: dayjs.Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    dates.push(start.add(i, "day"));
  }

  return dates;
}

/**
 * Build list date cho MONTH view
 * Trả về toàn bộ các ngày trong tháng
 */
export function buildMonthDates(from: string): dayjs.Dayjs[] {
  const start = dayjs(from).startOf("month");
  const end = dayjs(from).endOf("month");

  const dates: dayjs.Dayjs[] = [];
  let d = start.clone();

  while (d.valueOf() <= end.valueOf()) {
    dates.push(d.clone());
    d = d.add(1, "day");
  }

  return dates;
}
