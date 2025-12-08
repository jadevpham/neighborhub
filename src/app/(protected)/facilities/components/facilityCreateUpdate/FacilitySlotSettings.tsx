"use client";

import { FacilityFormSectionProps } from "@/types/facility";

export default function FacilitySlotSettings({
  form,
  updateField,
}: FacilityFormSectionProps) {
  return (
    <div className="border rounded-2xl p-4 bg-white/40 shadow-2xl">
      <h3 className="font-semibold text-base mb-3">Slot Settings</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Slot length (minutes)</label>
          <input
            type="number"
            min={1}
            value={form.slot_length_minutes}
            onChange={(e) =>
              updateField("slot_length_minutes", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Buffer time between slots (minutes)
          </label>
          <input
            type="number"
            min={0}
            value={form.buffer_time_minutes}
            onChange={(e) =>
              updateField("buffer_time_minutes", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Max slots per day</label>
          <input
            type="number"
            min={1}
            value={form.max_slots_per_day}
            onChange={(e) =>
              updateField("max_slots_per_day", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>
      </div>
    </div>
  );
}
