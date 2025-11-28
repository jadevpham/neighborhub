export function FileItem({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex justify-between border-b pb-1 hover:text-emerald-600 transition">
      <span>{name}</span>
      <span className="text-gray-400 text-xs">{size}</span>
    </div>
  );
}
