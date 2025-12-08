"use client";

import { FacilityFormSectionProps } from "@/types/facility";

const REFUND_POLICY_OPTIONS = [
  { value: 0, label: "Full refund" },
  { value: 1, label: "Partial refund" },
  { value: 2, label: "No refund" },
];

export default function FacilityFeesDeposit({
  form,
  updateField,
}: FacilityFormSectionProps) {
  const isPartialRefund = form.refund_policy === 1;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-base mb-3">Fees & Refund</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Booking fee (VND)</label>
          <input
            type="number"
            min={0}
            value={form.booking_fee_vnd}
            onChange={(e) =>
              updateField("booking_fee_vnd", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Refund policy</label>
          <select
            value={form.refund_policy}
            onChange={(e) =>
              updateField("refund_policy", Number(e.target.value) || 0)
            }
            className="w-full border px-3 py-2 rounded-md mt-1"
          >
            {REFUND_POLICY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {isPartialRefund && (
          <div>
            <label className="text-sm font-medium">
              Refund rate (0–1, for partial refund)
            </label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.05}
              value={form.refund_rate}
              onChange={(e) =>
                updateField("refund_rate", Number(e.target.value) || 0)
              }
              className="w-full border px-3 py-2 rounded-md mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: 0.5 = 50% refund on cancellation within allowed window.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
