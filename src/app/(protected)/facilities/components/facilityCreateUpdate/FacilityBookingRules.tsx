"use client";

import { FacilityFormSectionProps } from "@/types/facility";

export default function FacilityBookingRules({
  form,
  updateField,
}: FacilityFormSectionProps) {
  return (
    <div className="border rounded-2xl p-4 bg-white/40 shadow-2xl">
      <h3 className="font-semibold text-base mb-3">Booking Rules</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">
            Advance booking limit (days)
          </label>
          <input
            type="number"
            min={1}
            value={form.advance_booking_limit_days}
            onChange={(e) =>
              updateField(
                "advance_booking_limit_days",
                Number(e.target.value) || 0
              )
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Max bookings per week (per resident)
          </label>
          <input
            type="number"
            min={1}
            value={form.max_booking_per_week}
            onChange={(e) =>
              updateField("max_booking_per_week", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>
      </div>
    </div>
  );
}
