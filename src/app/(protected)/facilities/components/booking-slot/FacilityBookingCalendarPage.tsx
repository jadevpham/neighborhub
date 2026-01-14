"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";

import { useBookingSlots } from "@/hooks/useBookingSlot";
import { useFacilityDetailQuery } from "@/hooks/useFacility";

import BookingCalendar from "./BookingCalendar";
import BookingCalendarToolbar from "./BookingCalendarToolbar";

import { CalendarViewMode } from "@/constants/calendar";
import { toBEDate } from "@/utils/formatDate";
import { buildWeekDates, buildMonthDates } from "@/utils/calendar";
import { buildTimeSlots } from "./TimeRow";
import PageHeader from "@/components/PageHeader";
export default function FacilityBookingCalendarPage() {
  const { id } = useParams<{ id: string }>();

  /* =====================
   * LOAD DATA
   ===================== */
  const { data: facility, isLoading: loadingFacility } =
    useFacilityDetailQuery(id);

  const [viewMode, setViewMode] = useState<CalendarViewMode>("week");

  // FE state giữ YYYY-MM-DD
  const [from, setFrom] = useState(
    dayjs().startOf("week").format("YYYY-MM-DD")
  );
  const [to, setTo] = useState(dayjs().endOf("week").format("YYYY-MM-DD"));

  const apiRange =
    viewMode === "month"
      ? {
          from: toBEDate(dayjs(from).startOf("month").toDate()),
          to: toBEDate(dayjs(from).endOf("month").toDate()),
        }
      : viewMode === "day"
      ? {
          from: toBEDate(dayjs(from).toDate()),
          to: toBEDate(dayjs(from).toDate()),
        }
      : {
          from: toBEDate(dayjs(from).toDate()),
          to: toBEDate(dayjs(to).toDate()),
        };

  const { data: slots = [], isLoading } = useBookingSlots(id, apiRange);

  if (loadingFacility) return <div className="p-6">Loading facility…</div>;
  if (isLoading) return <div className="p-6">Loading slots…</div>;
  if (!facility) return <div className="p-6">Facility not found</div>;

  /* =====================
   * BUILD TIME ROWS
   ===================== */
  const stepMinutes =
    facility.slot_settings.slot_length_minutes +
    facility.slot_settings.buffer_time_minutes;

  const timeSlots = buildTimeSlots(
    facility.operating_hours.opening_time,
    facility.operating_hours.closing_time,
    stepMinutes
  );

  /* =====================
   * BUILD DATE COLUMNS (THEO VIEW MODE)
   ===================== */
  const calendarDates =
    viewMode === "month"
      ? buildMonthDates(from)
      : viewMode === "day"
      ? [dayjs(from)]
      : buildWeekDates(from);

  /* =====================
   * NAVIGATION
   ===================== */
  const handlePrev = () => {
    const unit =
      viewMode === "day" ? "day" : viewMode === "week" ? "week" : "month";

    setFrom(dayjs(from).subtract(1, unit).format("YYYY-MM-DD"));
    setTo(dayjs(to).subtract(1, unit).format("YYYY-MM-DD"));
  };

  const handleNext = () => {
    const unit =
      viewMode === "day" ? "day" : viewMode === "week" ? "week" : "month";

    setFrom(dayjs(from).add(1, unit).format("YYYY-MM-DD"));
    setTo(dayjs(to).add(1, unit).format("YYYY-MM-DD"));
  };

  /* =====================
   * RENDER
   ===================== */
  return (
    <>
      <PageHeader
        title="Facility Management - Facility Booking Calendar"
        subtitle="View and manage booking schedules for this facility."
        showBack={true}
      />
      <BookingCalendarToolbar
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setViewMode(mode);

          if (mode === "day") {
            const today = dayjs().format("YYYY-MM-DD");
            setFrom(today);
            setTo(today);
          }

          if (mode === "week") {
            const start = dayjs(from).startOf("week");
            setFrom(start.format("YYYY-MM-DD"));
            setTo(start.endOf("week").format("YYYY-MM-DD"));
          }

          if (mode === "month") {
            const start = dayjs(from).startOf("month");
            setFrom(start.format("YYYY-MM-DD"));
            setTo(start.endOf("month").format("YYYY-MM-DD"));
          }
        }}
        from={from}
        to={to}
        onDateChange={(f, t) => {
          setFrom(f);
          setTo(t);
        }}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <BookingCalendar
        slots={slots}
        viewMode={viewMode}
        timeSlots={timeSlots}
        calendarDates={calendarDates}
        stepMinutes={stepMinutes}
      />
    </>
  );
}
