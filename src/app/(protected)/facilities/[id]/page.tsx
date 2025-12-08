"use client";

import PageHeader from "@/components/PageHeader";
import FacilityForm from "../components/facilityCreateUpdate/FacilityForm";
import { useFacilityDetailQuery, useUpdateFacilityMutation } from "@/hooks/useFacility";
import { useParams } from "next/navigation";

export default function FacilityDetailPage() {
  const params = useParams();
  const facilityId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const { data, isLoading } = useFacilityDetailQuery(facilityId);
  const updateMutation = useUpdateFacilityMutation();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4">Facility not found</div>;

  // BE → FE mapping
  const initialValues = {
    name: data.name,
    description: data.description ?? "",
    img: data.img ? [data.img] : [],

    type_id: data.type_id,

    status: data.status,
    installed: data.installed, // "yyyy-MM-dd"

    // FLATTEN
    opening_time: data.operating_hours.opening_time,
    closing_time: data.operating_hours.closing_time,
    operation_days: data.operating_hours.operation_days,

    slot_length_minutes: data.slot_settings.slot_length_minutes,
    buffer_time_minutes: data.slot_settings.buffer_time_minutes,
    max_slots_per_day: data.slot_settings.max_slots_per_day,

    advance_booking_limit_days: data.booking_limit.advance_booking_limit_days,
    max_booking_per_week: data.booking_limit.max_booking_per_week,

    deadline_hours_before: data.cancel_policy.deadline_hours_before,
    max_cancel_per_week: data.cancel_policy.max_cancel_per_week,
    penalty_type: data.cancel_policy.penalty_type,
    ban_duration_days: data.cancel_policy.ban_duration_days,
    late_cancel_refund_rate: data.cancel_policy.late_cancel_refund_rate,

    booking_fee_vnd: data.fee.booking_fee_vnd,
    refund_policy: data.fee.refund_policy,
    refund_rate: data.fee.refund_rate,
  };

  const handleSubmit = (values: any) => {
    updateMutation.mutate({ id: facilityId, payload: values });
  };

  return (
    <>
      <PageHeader
        title="Update Facility"
        subtitle="Modify facility data and booking configuration."
        showBack={true}
      />

      <FacilityForm
        mode="update"
        initialValues={initialValues}
        loading={updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
}
