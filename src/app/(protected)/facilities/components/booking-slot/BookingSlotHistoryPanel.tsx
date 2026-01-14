import { useBookingSlotHistory } from "@/hooks/useBookingSlot";
import { bookingSlotHistoryActionMap } from "@/components/StatusBadge";
import { BookingSlotHistoryPanelProps } from "@/types/bookingSlot";
import { formatDate } from "@/utils/formatDate";
export default function BookingSlotHistoryPanel({
  slot_id,
  onClose,
}: BookingSlotHistoryPanelProps) {
  const { data, isLoading } = useBookingSlotHistory(slot_id, {});

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="w-[420px] bg-white shadow-2xl p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Slot History</h3>
          <button className="cursor-pointer" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        {isLoading ? (
          <p className="text-gray-400">Loading history...</p>
        ) : data?.length === 0 ? (
          <p className="text-gray-400">No history</p>
        ) : (
          <ul className="space-y-6">
            {data?.map((h) => {
              const meta = h.action
                ? bookingSlotHistoryActionMap[h.action]
                : null;
              return (
                <li key={h.id} className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <span className="text-xl">{meta?.icon}</span>
                    <div className="flex-1 w-px bg-gray-200 mt-1" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${meta?.color}`}
                    >
                      {meta?.label}
                    </div>

                    <p className="mt-1 text-sm text-gray-800">
                      {h.actor_name} ({h.actor_role})
                    </p>

                    {h.cancel_reason && (
                      <p className="mt-1 text-sm italic text-red-600">
                        “{h.cancel_reason}”
                      </p>
                    )}

                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(h.action_at!)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
