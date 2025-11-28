export function ActivityItem({
  user,
  action,
  date,
}: {
  user?: string;
  action: string;
  date?: string | null;
}) {
  return (
    <div className="border-l-2 border-emerald-400 pl-3 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-emerald-400 before:rounded-full text-sm">
      <p className="text-gray-800">
        <span className="font-medium">{user || "System"}</span>{" "}
        <span className="text-gray-600">{action}</span>
      </p>
      <p className="text-gray-400 text-xs">
        {date ? new Date(date).toLocaleString() : "—"}
      </p>
    </div>
  );
}