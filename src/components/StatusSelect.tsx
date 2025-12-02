import React from "react";
import { residentStatusMap, userStatusMap } from "@/components/StatusBadge"; // dùng chung map từ Resident
import { StatusSelectProps } from "@/types/common";

const StatusSelect: React.FC<StatusSelectProps> = ({
  name,
  value,
  onChange,
  type,
  allowedStatuses,
}) => {
  const map = type === "user" ? userStatusMap : residentStatusMap;

  const fullEntries = Object.entries(map).map(([key, v]) => ({
    value: Number(key),
    label: v.label,
    color: v.color,
  }));

  const entries = allowedStatuses
    ? allowedStatuses.map((s) => ({
        value: s,
        label: map[s].label,
        color: map[s].color,
      }))
    : fullEntries;

  return (
    <select
      name={name} // ⬅ VERY IMPORTANT
      value={value}
      onChange={onChange}
      className="px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">All</option>
      {entries.map((item) => (
        <option key={item.value} value={item.value} className={item.color}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
