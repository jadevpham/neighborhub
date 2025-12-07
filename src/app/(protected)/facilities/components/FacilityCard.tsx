import { useState } from "react";
import { FacilityData } from "@/types/facility";
import { Pencil, Trash2 } from "lucide-react";
import { facilityStatusMap } from "@/components/StatusBadge";
import { DeleteButton } from "@/components/DeleteButton";
import { toast } from "sonner";
import { useParams } from "next/navigation";
export default function FacilityCard({ item }: { item: FacilityData }) {
  const params = useParams();
  const id = params?.id as string;
  const status = facilityStatusMap[item.status ?? 0];

  const [hovered, setHovered] = useState(false);
  const handleDeleted = () => {
    toast.success("Feedback deleted successfully");
    // router.push("/news"); // quay về danh sách
  };
  return (
    <div
      className={`group/card relative rounded-2xl overflow-hidden cursor-pointer border bg-white transition-all duration-300 ${
        status.border
      } ${hovered ? "-translate-y-1" : ""}`}
      style={{
        boxShadow: hovered
          ? `0px 8px 40px ${status.shadowColor}`
          : "0px 2px 20px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE WRAPPER (để điều khiển vị trí badge) */}
      <div className="relative">
        <img
          src={item.img || "/placeholder.png"}
          className="w-full h-40 object-cover"
        />

        {/* STATUS BADGE – vị trí ngay dưới ảnh */}
        <span
          className={`absolute bottom-2 right-3 px-3 py-1 rounded-full text-xs ${status.badge}`}
        >
          {status.label}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <p className="font-semibold text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {item.description}
        </p>
      </div>
      {/* ACTION ICONS */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
        <button className="p-1 bg-white rounded-full shadow cursor-pointer">
          <Pencil className="w-4 h-4" />
        </button>
        <DeleteButton
          ids={id}
          resourceName="facilities"
          onDeleted={handleDeleted}
        />
      </div>
    </div>
  );
}
