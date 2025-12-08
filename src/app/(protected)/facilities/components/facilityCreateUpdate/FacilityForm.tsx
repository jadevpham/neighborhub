"use client";

import { useEffect, useState } from "react";
import {
  FacilityFormValues,
  UpdateFacilityFieldFn,
} from "@/types/facility";

import FacilityPhotos from "./FacilityPhotos";
import FacilityInformation from "./FacilityInformation";
import FacilityOperatingHours from "./FacilityOperatingHours";
import FacilitySlotSettings from "./FacilitySlotSettings";
import FacilityBookingRules from "./FacilityBookingRules";
import FacilityCancelPolicy from "./FacilityCancelPolicy";
import FacilityFeesDeposit from "./FacilityFeesDeposit";
import FacilitySubmitBar from "./FacilitySubmitBar";

interface FacilityFormProps {
  mode: "create" | "update";
  initialValues?: Partial<FacilityFormValues>;
  loading?: boolean;
  onSubmit: (values: FacilityFormValues) => void;
}

const defaultForm: FacilityFormValues = {
  name: "",
  description: "",
  img: [],

  type_id: "",

  status: 1,
  installed: "",

  opening_time: "",
  closing_time: "",
  operation_days: [],

  slot_length_minutes: 60,
  buffer_time_minutes: 0,
  max_slots_per_day: 5,

  advance_booking_limit_days: 7,
  max_booking_per_week: 3,

  deadline_hours_before: 2,
  max_cancel_per_week: 3,
  penalty_type: 0,
  ban_duration_days: null,
  late_cancel_refund_rate: 0,

  booking_fee_vnd: 0,
  refund_policy: 0,
  refund_rate: 0,
};

export default function FacilityForm({
  mode,
  initialValues,
  loading = false,
  onSubmit,
}: FacilityFormProps) {
  const [form, setForm] = useState<FacilityFormValues>({
    ...defaultForm,
    ...initialValues,
  });

  // Nếu initialValues thay đổi (update), sync lại form
  useEffect(() => {
    if (initialValues) {
        setForm((prev) => ({
            ...prev,
            ...initialValues,
            type_id: initialValues?.type_id ?? prev.type_id,
          }));
          
    }
  }, [initialValues]);

  const updateField: UpdateFacilityFieldFn = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    console.log("SUBMIT DATA:", form);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 space-y-6">
              {/* Photos */}


{/* MAIN FORM CONTENT */}
<div className="space-y-8">

  {/* 1️⃣ INFORMATION BLOCK — full width */}
  <FacilityInformation
    form={form}
    updateField={updateField}
    isUpdate={mode === "update"}
  />

  {/* 2️⃣ CONFIG BLOCKS — chia 2 cột */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FacilityOperatingHours form={form} updateField={updateField} />
    <FacilitySlotSettings form={form} updateField={updateField} />
    <FacilityBookingRules form={form} updateField={updateField} />
    <FacilityCancelPolicy form={form} updateField={updateField} />
    <FacilityFeesDeposit form={form} updateField={updateField} />
    <FacilityPhotos
        images={form.img}
        onChange={(imgs) => updateField("img", imgs)}
      />
  </div>

</div>




      {/* Submit bar */}
      <FacilitySubmitBar mode={mode} loading={loading} onSubmit={handleSubmit} />
    </div>
  );
}
