export function Card({
  title,
  children,
  actionText,
}: {
  title: string;
  children: React.ReactNode;
  actionText?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center justify-between">
        {title}
        {actionText && (
          <button className="text-sm text-emerald-500 hover:underline">
            {actionText}
          </button>
        )}
      </h3>
      <div className="text-sm text-gray-700 space-y-3">{children}</div>
    </div>
  );
}