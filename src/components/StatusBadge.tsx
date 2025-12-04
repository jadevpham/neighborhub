// components/StatusBadge.tsx
import { BadgeProps } from "@/types/common";

// subset dùng cho UserSearchFilter
export const userStatusMap: Record<
  number,
  {
    label: string;
    badge: string;
    border: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  0: {
    label: "Blocked",
    badge: "bg-red-200 text-red-800",
    border: "border-red-300",
    hoverBorder: "hover:border-red-600",
    hoverShadow: "hover:shadow-red-300",
  },
  1: {
    label: "Active",
    badge: "bg-green-100 text-green-700",
    border: "border-green-300",
    hoverBorder: "hover:border-green-600",
    hoverShadow: "hover:shadow-green-300",
  },
  // Nếu cần thêm trạng thái 2 = Deleted
  2: {
    label: "Deleted",
    badge: "bg-gray-300 text-gray-700",
    border: "border-gray-300",
    hoverBorder: "hover:border-gray-500",
    hoverShadow: "hover:shadow-gray-300",
  },
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
  2: [{ key: "approve", label: "Approve", bg: "#22c55e20", color: "#15803d" }],

  // blocked
  3: [
    { key: "unblock", label: "Unblock", bg: "#3b82f620", color: "#1d4ed8" },
    { key: "delete", label: "Delete", bg: "#ef444420", color: "#b91c1c" },
  ],
};

// subset dùng cho status của news
export const newsStatusMap: Record<
  number,
  {
    label: string;
    badge: string;
    border: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  0: {
    label: "Draft",
    badge: "bg-gray-200 text-gray-700",
    border: "border-gray-300",
    hoverBorder: "hover:border-gray-500",
    hoverShadow: "hover:shadow-gray-300",
  },
  1: {
    label: "Published",
    badge: "bg-green-100 text-green-700",
    border: "border-green-300",
    hoverBorder: "hover:border-green-600",
    hoverShadow: "hover:shadow-green-300",
  },
  2: {
    label: "Archived",
    badge: "bg-red-100 text-red-700",
    border: "border-red-300",
    hoverBorder: "hover:border-red-600",
    hoverShadow: "hover:shadow-red-300",
  },
  3: {
    label: "Scheduled",
    badge: "bg-blue-100 text-blue-700",
    border: "border-blue-300",
    hoverBorder: "hover:border-blue-600",
    hoverShadow: "hover:shadow-blue-300",
  },
  4: {
    label: "Deleted",
    badge: "bg-gray-100 text-gray-500",
    border: "border-gray-200",
    hoverBorder: "hover:border-gray-500",
    hoverShadow: "hover:shadow-gray-300",
  },
};

const StatusBadge: React.FC<BadgeProps> = ({ status, map }) => {
  const info = map[status];

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
