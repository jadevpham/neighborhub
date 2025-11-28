export function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="font-medium text-gray-500">{label}</p>
      <p>{value || "—"}</p>
    </div>
  );
}
