import BookingCalendarWeek from "./BookingCalendarWeek";

export default function BookingCalendarDay(props: any) {
  return (
    <div className="relative overflow-visible">
      <BookingCalendarWeek
        {...props}
        calendarDates={[props.calendarDates[0]]}
        forceDayMode
      />
    </div>
  );
}
