import type { RecentResponse } from "@/types/dashboard";
import { formatDate } from "@/utils/formatDate";

interface Props {
  recent: RecentResponse["news"];
}

export default function RecentNews({ recent }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <h3 className="font-semibold mb-3 text-sm">Latest news</h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recent.length === 0 && (
          <p className="text-xs text-gray-400">No recent news</p>
        )}

        {recent.map((n) => (
          <div key={n.id} className="text-sm">
            <p className="font-medium line-clamp-2">{n.title}</p>

            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span className="uppercase">Scope: {n.scope}</span>
              <span>{formatDate(n.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
