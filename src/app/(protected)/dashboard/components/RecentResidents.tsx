import type { RecentResponse } from "@/types/dashboard";
import { formatDate } from "@/utils/formatDate";

const residentStatusMap: Record<
  number,
  { label: string; className: string }
> = {
  0: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
  1: { label: "Active", className: "bg-green-100 text-green-700" },
  2: { label: "Rejected", className: "bg-red-100 text-red-700" },
  3: { label: "Blocked", className: "bg-gray-200 text-gray-700" },
  4: { label: "Deleted", className: "bg-red-200 text-red-800" },
};

interface Props {
  recent: RecentResponse["residents"];
}

export default function RecentResidents({ recent }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <h3 className="font-semibold mb-3 text-sm">New residents</h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recent.length === 0 && (
          <p className="text-xs text-gray-400">No recent residents</p>
        )}

        {recent.map((r) => {
          const status = residentStatusMap[r.status_resident];

          return (
            <div key={r.id} className="flex items-center gap-3 text-sm">
              <img
                src={
                  r.avatar ||
                  "https://ui-avatars.com/api/?name=R&background=E5E7EB"
                }
                className="w-10 h-10 rounded-full"
                alt={r.name}
              />

              <div className="flex-1">
                <p className="font-medium">{r.name}</p>
                <p className="text-[11px] text-gray-500">
                  {formatDate(r.created_at)}
                </p>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status.className}`}
              >
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
