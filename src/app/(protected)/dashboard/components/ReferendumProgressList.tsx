import type { ReferendumsData } from "@/types/dashboard";

interface Props {
  data: ReferendumsData["trends"];
}

export default function ReferendumProgressList({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <p className="text-xs text-gray-400">No active referendums</p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((r) => (
        <div key={r.referendum_id}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium line-clamp-1">{r.title}</span>
            <span>{Math.round(r.participation * 100)}%</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-indigo-500"
              style={{
                width: `${Math.round(r.participation * 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
