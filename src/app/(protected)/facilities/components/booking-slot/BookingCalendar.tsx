import BookingCalendarWeek from "./BookingCalendarWeek";
import BookingCalendarDay from "./BookingCalendarDay";
import BookingCalendarMonth from "./BookingCalendarMonth";
import { BookingCalendarProps } from "@/types/bookingSlot";

export default function BookingCalendar(props: BookingCalendarProps) {
  switch (props.viewMode) {
    case "day":
      return <BookingCalendarDay {...props} />;

    case "month":
      return <BookingCalendarMonth {...props} />;

    case "week":
    default:
      return <BookingCalendarWeek {...props} />;
  }
}
