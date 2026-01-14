// components/StatusBadge.tsx
import { BadgeProps } from "@/types/common";
import { BookingSlotAction } from "@/types/bookingSlot";
import { EventStatus } from "@/types/event";

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

// subset dùng cho category của feedback
export const feedbackCategoryMap: Record<
  number | "default",
  { label: string; color: string; border: string; shadow: string }
> = {
  0: {
    label: "Complaint",
    color: "bg-red-100 text-red-700",
    border: "border-red-300",
    shadow: "hover:shadow-red-300",
  },
  1: {
    label: "Suggestion",
    color: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-300",
    shadow: "hover:shadow-emerald-300",
  },
  2: {
    label: "Question",
    color: "bg-blue-100 text-blue-700",
    border: "border-blue-300",
    shadow: "hover:shadow-blue-300",
  },
  // fallback
  default: {
    label: "N/A",
    color: "bg-gray-200 text-gray-600",
    border: "border-gray-300",
    shadow: "hover:shadow-gray-300",
  },
};

// subset dùng cho status của feedback
export const feedbackStatusMap: Record<
  number | "default",
  { label: string; color: string }
> = {
  0: { label: "Draft", color: "bg-gray-200 text-gray-700" },
  1: { label: "Unreplied", color: "bg-yellow-100 text-yellow-700" },
  2: { label: "Replied", color: "bg-blue-100 text-blue-700" },
  3: { label: "Deleted", color: "bg-red-200 text-red-800" },
  // fallback
  default: { label: "N/A", color: "bg-gray-200 text-gray-600" },
};

// subset dùng cho priority của feedback
export const feedbackPriorityMap: Record<
  number | "default",
  { label: string; color: string; border: string; shadow: string }
> = {
  0: {
    label: "Low",
    color: "bg-green-100 text-green-700",
    border: "border-green-300",
    shadow: "hover:shadow-green-300",
  },
  1: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-300",
    shadow: "hover:shadow-yellow-300",
  },
  2: {
    label: "High",
    color: "bg-red-100 text-red-700",
    border: "border-red-300",
    shadow: "hover:shadow-red-300",
  },
  // fallback
  default: {
    label: "N/A",
    color: "bg-gray-200 text-gray-600",
    border: "border-gray-300",
    shadow: "hover:shadow-gray-300",
  },
};

// subset dùng cho status của facility
export const facilityStatusMap: Record<
  number,
  { label: string; badge: string; border: string; shadowColor: string }
> = {
  0: {
    label: "Maintenance",
    badge: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-300",
    shadowColor: "rgba(234, 179, 8, 0.45)", // yellow-500 alpha
  },
  1: {
    label: "Active",
    badge: "bg-green-100 text-green-700",
    border: "border-green-300",
    shadowColor: "rgba(34, 197, 94, 0.45)", // green-500 alpha
  },
};

// subset dùng cho status của booing-slot
export const bookingSlotStatusMap: Record<
  number | any,
  { label: string; color: string }
> = {
  0: {
    label: "Blocked",
    color: "bg-gray-200 text-gray-800 border-gray-300",
  },
  1: {
    label: "Booked by Resident",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  2: {
    label: "Booked by SAMB",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
  3: {
    label: "Cancelled by Resident",
    color: "bg-red-100 text-red-800 border-red-300",
  },
  4: {
    label: "Cancelled by SAMB",
    color: "bg-orange-100 text-orange-800 border-orange-300",
  },
} as const;

// subset dùng cho action của booing-slot history
export const bookingSlotHistoryActionMap: Record<
  BookingSlotAction,
  {
    label: string;
    color: string;
    icon: string;
  }
> = {
  booked_by_resident: {
    label: "Booked by resident",
    color: "bg-green-100 text-green-700",
    icon: "🟢",
  },
  cancelled_by_resident: {
    label: "Cancelled by resident",
    color: "bg-red-100 text-red-700",
    icon: "🔴",
  },
  blocked_by_samb: {
    label: "Blocked by admin",
    color: "bg-gray-200 text-gray-700",
    icon: "⛔",
  },
  unblocked_by_samb: {
    label: "Unblocked by admin",
    color: "bg-blue-100 text-blue-700",
    icon: "🔓",
  },
  booked_by_samb: {
    label: "Booked by admin",
    color: "bg-blue-100 text-blue-700",
    icon: "🛡️",
  },
  cancelled_by_samb: {
    label: "Cancelled by admin",
    color: "bg-orange-100 text-orange-700",
    icon: "⚠️",
  },
};

// subset dùng cho status của event
export const eventStatusMap: Record<
  EventStatus,
  {
    label: string;
    badge: string;
    border?: string;
    hover?: string;
  }
> = {
  [EventStatus.Draft]: {
    label: "Draft",
    badge: "bg-gray-100 text-gray-700",
    border: "border-gray-200",
    hover: "hover:shadow-gray-50 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-gray-300/40",
  },

  [EventStatus.Pending]: {
    label: "Pending",
    badge: "bg-yellow-100 text-yellow-800",
    border: "border-yellow-200",
    hover: "hover:shadow-yellow-50 hover:bg-yellow-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-yellow-300/40",
  },

  [EventStatus.Rejected]: {
    label: "Rejected",
    badge: "bg-red-100 text-red-800",
    border: "border-red-200",
    hover: "hover:shadow-red-50 hover:bg-red-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-red-300/40",
  },

  [EventStatus.Active]: {
    label: "Active",
    badge: "bg-green-100 text-green-800",
    border: "border-green-200",
    hover: "hover:shadow-green-50 hover:bg-green-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-green-300/40",
  },

  [EventStatus.Cancelled]: {
    label: "Cancelled",
    badge: "bg-orange-100 text-orange-800",
    border: "border-orange-200",
    hover: "hover:shadow-orange-50 hover:bg-orange-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-orange-300/40",
  },

  [EventStatus.Deleted]: {
    label: "Deleted",
    badge: "bg-gray-300 text-gray-600",
    border: "border-gray-300",
    hover: "hover:shadow-gray-50 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-gray-300/40",
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
