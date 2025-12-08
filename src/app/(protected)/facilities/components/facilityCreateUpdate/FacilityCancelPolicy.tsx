"use client";

import { FacilityFormSectionProps } from "@/types/facility";

const PENALTY_OPTIONS = [
  { value: 0, label: "Temporary ban" },
  { value: 1, label: "Refund reduction" },
  { value: 2, label: "Warning only" },
  { value: 3, label: "None" },
];

export default function FacilityCancelPolicy({
  form,
  updateField,
}: FacilityFormSectionProps) {
  const isBanType = form.penalty_type === 0;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-base mb-3">Cancellation Policy</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">
            Deadline before slot (hours)
          </label>
          <input
            type="number"
            min={0}
            value={form.deadline_hours_before}
            onChange={(e) =>
              updateField(
                "deadline_hours_before",
                Number(e.target.value) || 0
              )
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Max cancellations per week
          </label>
          <input
            type="number"
            min={0}
            value={form.max_cancel_per_week}
            onChange={(e) =>
              updateField("max_cancel_per_week", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Penalty type</label>
          <select
            value={form.penalty_type}
            onChange={(e) =>
              updateField("penalty_type", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          >
            {PENALTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {isBanType && (
          <div>
            <label className="text-sm font-medium">
              Ban duration (days, for temporary ban)
            </label>
            <input
              type="number"
              min={0}
              value={form.ban_duration_days ?? 0}
              onChange={(e) =>
                updateField(
                  "ban_duration_days",
                  e.target.value === "" ? null : Number(e.target.value) || 0
                )
              }
              className="w-full border px-3 py-2 rounded-md mt-1"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium">
            Late cancel refund rate (0–1)
          </label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={form.late_cancel_refund_rate}
            onChange={(e) =>
              updateField(
                "late_cancel_refund_rate",
                Number(e.target.value) || 0
              )
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: 0.2 = 20% refund when cancelling late.
          </p>
        </div>
      </div>
    </div>
  );
}
