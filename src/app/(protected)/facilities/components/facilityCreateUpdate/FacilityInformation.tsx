"use client";

import { FacilityInformationProps } from "@/types/facility";
import { toBEDate } from "@/utils/formatDate";
export default function FacilityInformation({
  form,
  updateField,
  isUpdate = false,
}: FacilityInformationProps) {
  return (
<div className="space-y-4">

{/* GRID 2 CỘT CHO 4 FIELD */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* NAME */}
  <div>
    <label className="text-sm font-medium">Name</label>
    <input
      value={form.name}
      onChange={(e) => updateField("name", e.target.value)}
      placeholder="Facility name"
      className="w-full border px-3 py-2 rounded-md mt-1"
    />
  </div>

  {/* TYPE */}
  <div>
    {/* <label className="text-sm font-medium">Type</label> */}
    <input
      type="hidden"
      value={form.type_id}
      disabled
      className="w-full border px-3 py-2 rounded-md mt-1 bg-gray-100 cursor-not-allowed"
    />
  </div>

  {/* STATUS */}
  <div>
    <label className="text-sm font-medium">Status</label>
    <select
      value={form.status}
      onChange={(e) => updateField("status", Number(e.target.value))}
      className="border px-3 py-2 rounded-md w-full mt-1"
    >
      <option value={1}>Active</option>
      <option value={0}>Maintenance</option>
    </select>
  </div>

  {/* INSTALLED */}
  <div>
    <label className="text-sm font-medium">Installed</label>
    <input
      type="date"
      value={form.installed || ""}
      onChange={(e) => updateField("installed", e.target.value)}
      className="w-full border px-3 py-2 rounded-md mt-1"
    />
  </div>
</div>

{/* DESCRIPTION — FULL WIDTH */}
<div>
  <label className="text-sm font-medium">Description</label>
  <textarea
    value={form.description}
    onChange={(e) => updateField("description", e.target.value)}
    className="w-full border px-3 py-2 rounded-md mt-1 h-24"
  />
</div>

</div>

  );
}
