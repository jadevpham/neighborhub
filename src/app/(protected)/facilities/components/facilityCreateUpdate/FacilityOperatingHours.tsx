"use client";

import { FacilityFormSectionProps } from "@/types/facility";

const DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function FacilityOperatingHours({
  form,
  updateField,
}: FacilityFormSectionProps) {
  const toggleDay = (day: string) => {
    const current = form.operation_days || [];
    if (current.includes(day)) {
      updateField(
        "operation_days",
        current.filter((d) => d !== day)
      );
    } else {
      updateField("operation_days", [...current, day]);
    }
  };

  return (
    <div className="border rounded-2xl p-4 bg-white/40 shadow-2xl">
      <h3 className="font-semibold text-base mb-3">Operating Hours</h3>

      {/* Opening / Closing */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-sm font-medium">Opening time</label>
          <input
            type="time"
            value={form.opening_time}
            onChange={(e) => updateField("opening_time", e.target.value)}
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Closing time</label>
          <input
            type="time"
            value={form.closing_time}
            onChange={(e) => updateField("closing_time", e.target.value)}
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>
      </div>

      {/* Operation Days */}
      <div>
        <label className="text-sm font-medium mb-2 block">Operation days</label>
        <div className="flex flex-wrap gap-2">
          {DAY_OPTIONS.map((day) => {
            const active = form.operation_days?.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full text-xs border transition cursor-pointer ${
                  active
                    ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                    : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
