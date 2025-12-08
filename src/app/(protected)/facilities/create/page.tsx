"use client";

import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import FacilityForm from "../components/facilityCreateUpdate/FacilityForm";
import { FacilityFormValues } from "@/types/facility";
import { useCreateFacilityMutation } from "@/hooks/useFacility";
import { useSearchParams } from "next/navigation";

export default function FacilityCreatePage() {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type_id") ?? "";

  const createMutation = useCreateFacilityMutation();

  const initialValues: Partial<FacilityFormValues> = {
    type_id: typeId,
    status: 1,
    operation_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  const handleSubmit = (values: FacilityFormValues) => {
    createMutation.mutate({ payload: values });
  };

  return (
    <>
      <PageHeader
        title="Create New Facility"
        subtitle="Add a new facility under this category and setting booking rules."
        showBack={true}
      />

      <FacilityForm
        mode="create"
        initialValues={initialValues}
        loading={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
}
