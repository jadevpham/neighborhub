import FacilityCard from "./FacilityCard";
import {
  FacilityColumnProps,
  FacilityData,
  FacilityTypeData,
} from "@/types/facility";
import { Pencil, Plus } from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function FacilityColumn({
  type,
  items,
  onShowDetail,
  onEdit,
}: FacilityColumnProps) {
  const params = useParams();
  const id = params?.id as string;
  const handleDeleted = () => {
    toast.success("Facility Type deleted successfully");
  };
  const router = useRouter();
  return (
    <div className="flex flex-col min-w-[270px] relative">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3 group">
        <p
          className="font-semibold text-lg cursor-pointer hover:text-emerald-600"
          onClick={onShowDetail}
        >
          {type.name}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="p-1 rounded hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation(); // tránh mở detail khi click edit
              onEdit(type);
            }}
          >
            <Pencil className="w-4 h-4 cursor-pointer" />
          </button>

          <DeleteButton
            ids={type.id!}
            resourceName="facility-types"
            onDeleted={handleDeleted}
          />
        </div>
      </div>

      {/* LIST FACILITIES */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <FacilityCard key={item.id} item={item} />
        ))}

<button
          onClick={() => router.push(`/facilities/create?type_id=${type.id}`)}
          className="flex items-center gap-2 text-gray-600 mt-1 hover:text-black cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Facility
        </button>
      </div>
    </div>
  );
}
