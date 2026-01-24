import type { RecentResponse } from "@/types/dashboard";
import { formatDate } from "@/utils/formatDate";

interface Props {
  recent: RecentResponse["events"];
}

const eventStatusMap: Record<number, string> = {
  0: "Draft",
  1: "Pending",
  2: "Rejected",
  3: "Active",
};

export default function RecentEvents({ recent }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <h3 className="font-semibold mb-3 text-sm">Upcoming events</h3>

      <div className="space-y-4 max-h-56 overflow-y-auto">
        {recent.length === 0 && (
          <p className="text-xs text-gray-400">No upcoming events</p>
        )}

        {recent.map((e) => (
          <div key={e.id} className="text-sm">
            <p className="font-medium line-clamp-2">{e.title}</p>

            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span className="capitalize">
                {eventStatusMap[e.status] ?? "Unknown"}
              </span>
              <span>{formatDate(e.start_time)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
