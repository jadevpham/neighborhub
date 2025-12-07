import { FacilityTypeDetailPanelProps } from "@/types/facility";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { X, Tag, MapPin, User, CalendarClock } from "lucide-react";
export default function FacilityTypeDetailPanel({
  item,
  onClose,
}: FacilityTypeDetailPanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // để animation slide-in mượt hơn
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200); // chờ animation slide-out
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
      {/* CLICK OUTSIDE TO CLOSE */}
      <div className="flex-1" onClick={handleClose} />

      {/* PANEL */}
      <div
        className={`
            w-full max-w-md h-full bg-white shadow-2xl flex flex-col
            transform transition-transform duration-200
            ${visible ? "translate-x-0" : "translate-x-full"}
          `}
      >
        {/* HEADER */}
        <div className="relative px-6 pt-5 pb-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">
                Facility Type
              </p>
              <h2 className="text-xl font-semibold mt-1">{item.name}</h2>
              <p className="text-xs mt-1 text-emerald-100">ID: {item.id}</p>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* BASIC INFO */}
          <section className="border border-emerald-50 rounded-xl p-4 bg-emerald-50/40">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-emerald-800">
                Basic Information
              </h3>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Level</span>
                <span className="font-medium text-gray-900">
                  {item.level || "—"}
                </span>
              </div>
            </div>
          </section>

          {/* SCOPE */}
          <section className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-semibold text-emerald-800">Scope</h3>
            </div>
            <div className="space-y-1 text-sm">
              {item.level === "site" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Site Name</span>
                  <span className="font-medium text-gray-900">
                    {item.site_name || "—"}
                  </span>
                </div>
              )}
              {item.level === "zone" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Zone Name</span>
                  <span className="font-medium text-gray-900">
                    {item.zone_name || "—"}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                {(item.status === 1 && (
                  <span className="font-medium text-emerald-500">Active</span>
                )) ||
                  "—"}
              </div>
            </div>
          </section>

          {/* META */}
          <section className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-semibold text-emerald-800">
                Metadata
              </h3>
            </div>
            <div className="space-y-1 text-sm mb-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Created by</span>
                <span className="font-medium text-gray-900">
                  {item.created_by || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <CalendarClock className="w-4 h-4" />
                  <span>Created at</span>
                </div>
                <span className="font-medium text-gray-900 text-right">
                  {formatDate(item.created_at)}{" "}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Updated by</span>
                <span className="font-medium text-gray-900">
                  {item.updated_by || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <CalendarClock className="w-4 h-4" />
                  <span>Updated at</span>
                </div>
                <span className="font-medium text-gray-900 text-right">
                  {formatDate(item.updated_at)}{" "}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-6 py-3 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
