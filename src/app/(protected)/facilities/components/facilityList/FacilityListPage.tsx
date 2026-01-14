"use client";

import { useState, useRef, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import FacilitySearchFilter from "./FacilitySearchFilter";
import FacilityTypeDetailPanel from "./FacilityTypeDetailPanel";
import {
  useFacilityListQuery,
  useFacilityTypeDetailQuery,
  useFacilityTypeListQuery,
  useUpdateFacilityTypeMutation,
} from "@/hooks/useFacility";

import {
  FacilityData,
  FacilityParam,
  FacilityTypeData,
} from "@/types/facility";

import FacilityColumn from "./FacilityColumn";
import AddListButton from "./AddListButton";
import FacilityTypeModalPopup from "./FacilityTypeModalPopup";

export default function FacilityListPage() {
  const [filters, setFilters] = useState<FacilityParam>({
    search: "",
    status: null,
    type_id: null,
  });

  // Facilities
  const { data: facilityRes, refetch } = useFacilityListQuery(filters);
  const facilities = facilityRes?.data ?? [];

  // Facility Types
  const { data: typeRes } = useFacilityTypeListQuery();
  const facilityTypes = typeRes?.data ?? [];

  // Group facilities by type
  const grouped: Record<string, FacilityData[]> = {};
  facilityTypes.forEach((t) => {
    grouped[t.name!] = facilities.filter((f) => f.type === t.name);
  });

  const handleFilterChange = (newFilters: FacilityParam) => {
    setFilters(newFilters);
    refetch();
  };

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const detailQuery = useFacilityTypeDetailQuery(selectedTypeId);

  const [editType, setEditType] = useState<FacilityTypeData | null>(null);
  const updateMutation = useUpdateFacilityTypeMutation();

  // ============================
  // AUTO SCROLL TO TYPE COLUMN
  // ============================

  // Ref cho container scroll ngang
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Tạo ref cho từng Facility Type
  const typeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!filters.type_id) return;

    const targetRef = typeRefs.current[filters.type_id];
    const container = scrollContainerRef.current;

    if (targetRef && container) {
      container.scrollTo({
        left: targetRef.offsetLeft - 40,
        behavior: "smooth",
      });
    }
  }, [filters.type_id, facilityTypes]);

  return (
    <>
      <PageHeader
        title="Facility Management - Facility List"
        subtitle="Organize and manage your community facilities."
        showBack={true}
      />

      <FacilitySearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* MAIN LIST */}
      <div
        ref={scrollContainerRef}
        className="flex items-start gap-8 overflow-x-auto pb-6 pt-4"
      >
        {facilityTypes.map((type) => (
          <div
            key={type.id}
            ref={(el) => {
              typeRefs.current[type.id!] = el;
            }}
          >
            <FacilityColumn
              type={type}
              items={grouped[type.name!] ?? []}
              onShowDetail={() => setSelectedTypeId(type.id!)}
              onEdit={(t) => setEditType(t)}
            />
          </div>
        ))}

        <AddListButton onCreated={(t) => setSelectedTypeId(t.id!)} />
      </div>

      {/* Update Modal */}
      <FacilityTypeModalPopup
        open={!!editType}
        title="Update Facility Type"
        confirmLabel="Update"
        initialName={editType?.name ?? ""}
        loading={updateMutation.isPending}
        onConfirm={(newName) =>
          updateMutation.mutate(
            {
              id: editType!.id!,
              name: newName,
            },
            {
              onSuccess: () => setEditType(null),
            }
          )
        }
        onClose={() => setEditType(null)}
      />

      {/* DETAIL PANEL */}
      {selectedTypeId && detailQuery.data && (
        <FacilityTypeDetailPanel
          item={detailQuery.data}
          onClose={() => setSelectedTypeId(null)}
        />
      )}
    </>
  );
}
