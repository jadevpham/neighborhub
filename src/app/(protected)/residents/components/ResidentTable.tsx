"use client";

import StatusBadge from "@/components/StatusBadge"; // status_resident map
import Image from "next/image";
import { useRouter } from "next/navigation";
import { residentStatusMap } from "@/components/StatusBadge";
export const ResidentTable = ({ residents }: any) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto rounded-lg border border-emerald-100 shadow-sm">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-emerald-50 text-emerald-800 text-sm font-semibold">
            <th className="p-3 text-left">Resident</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Registered</th>
            <th className="p-3 text-left">Approved</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {residents.map((r: any) => (
            <tr
              key={r.id}
              className="border-t hover:bg-emerald-50/40 transition-colors cursor-pointer"
              onClick={() => router.push(`/residents/${r.id}`)} 
            >
              {/* AVATAR + NAME */}
              <td className="p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={r.avatar || "/placeholder-avatar.png"}
                    alt={r.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-gray-800">{r.name}</span>
              </td>

              {/* EMAIL */}
              <td className="p-3 text-gray-700">{r.email}</td>

              {/* PHONE */}
              <td className="p-3 text-gray-700">{r.phone}</td>

              {/* REGISTER DATE */}
              <td className="p-3 text-gray-700">{r.registration_at || "--"}</td>

              {/* APPROVE DATE */}
              <td className="p-3 text-gray-700">{r.approval_at || "--"}</td>

              {/* STATUS BADGE */}
              <td className="p-3">
                <StatusBadge status={r.status_resident} map={residentStatusMap}/>
              </td>
            </tr>
          ))}

          {residents.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No residents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
