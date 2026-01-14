// booking-slots/constants/calendar.ts
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export type CalendarViewMode = "day" | "week" | "month";

