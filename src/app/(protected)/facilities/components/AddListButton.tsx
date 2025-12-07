"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateFacilityTypeMutation } from "@/hooks/useFacility";
import { toast } from "sonner";
import FacilityTypeDetailPanel from "./FacilityTypeDetailPanel";
import { AddListButtonProps, FacilityTypeData } from "@/types/facility";
import FacilityTypeModalPopup from "./FacilityTypeModalPopup";
export default function AddListButton({ onCreated }: AddListButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const mutation = useCreateFacilityTypeMutation();

  const handleSubmit = (value: string) => {
    if (!value.trim()) {
      toast.error("Please enter facility type name");
      return;
    }

    mutation.mutate(
      { name: value },
      {
        onSuccess: (newType) => {
          toast.success(`Created facility type: ${newType.name}`);
          onCreated?.(newType);
          setOpen(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Failed to create");
        },
      }
    );
  };

  return (
    <>
      {/* MAIN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center w-48 h-60 border-2 border-dashed border-gray-300 rounded-2xl hover:bg-gray-50 transition cursor-pointer"
      >
        <span className="mb-2">Add Facility Type</span>
        <Plus className="w-8 h-8" />
      </button>

      {/* MODAL */}

      <FacilityTypeModalPopup
        open={open}
        title="Create Facility Type"
        confirmLabel="Create"
        loading={mutation.isPending}
        onConfirm={handleSubmit}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
