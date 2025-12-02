// components/StatusBadge.tsx
import { BadgeProps } from "@/types/common";

// subset dùng cho UserSearchFilter
export const userStatusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Blocked", color: "bg-gray-300 text-gray-700" },
  1: { label: "Active", color: "bg-green-100 text-green-700" },
  // 2: { label: "Deleted", color: "bg-red-200 text-red-800" },
};

// subset dùng cho ResidentSearchFilter
export const residentStatusMap: Record<
  number,
  { label: string; color: string }
> = {
  0: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  1: { label: "Active", color: "bg-green-100 text-green-700" },
  2: { label: "Rejected", color: "bg-red-100 text-red-700" },
  3: { label: "Blocked", color: "bg-gray-300 text-gray-700" },
  // 4: { label: "Deleted", color: "bg-red-200 text-red-800" },
};

// subset dùng cho ResidentAppoval
export const residentAppovalStatusMap: Record<
  number,
  { key: string; label: string; bg: string; color: string }[]
> = {
  // pending
  0: [
    { key: "approve", label: "Approve", bg: "#22c55e20", color: "#15803d" },
    { key: "reject", label: "Reject", bg: "#ef444420", color: "#b91c1c" },
  ],

  // active
  1: [
    { key: "block", label: "Block", bg: "#f59e0b20", color: "#b45309" },
    { key: "delete", label: "Delete", bg: "#ef444420", color: "#b91c1c" },
  ],

  // rejected
  2: [
    { key: "approve", label: "Approve", bg: "#22c55e20", color: "#15803d" },
  ],

  // blocked
  3: [
    { key: "unblock", label: "Unblock", bg: "#3b82f620", color: "#1d4ed8" },
    { key: "delete", label: "Delete", bg: "#ef444420", color: "#b91c1c" },
  ],
};

// export const residentAppovalStatusMap: any = {
//   0: [
//     { label: "Approve", className: "bg-green-100 text-green-700" },
//     { label: "Reject", className: "bg-red-100 text-red-700" },
//   ],
//   1: [
//     { label: "Block", className: "bg-gray-100 text-gray-700" },
//     { label: "Delete", className: "bg-red-200 text-red-800" },
//   ],
//   2: [
//     { label: "Approve", className: "bg-green-100 text-green-700" },
//   ],
//   3: [
//     { label: "Unblock", className: "bg-green-100 text-green-800" },
//     { label: "Delete", className: "bg-red-200 text-red-800" },
//   ],
// };


const StatusBadge: React.FC<BadgeProps> = ({ status, map }) => {
  const info = map[status]

  if (!info) return null;

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${info.color}`}
    >
      {info.label}
    </span>
  );
};

export default StatusBadge;