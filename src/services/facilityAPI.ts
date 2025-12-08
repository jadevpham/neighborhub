import {
  FacilityParam,
  FacilityListResponse,
  FacilityTypeListResponse,
  FacilityData,
  FacilityFormValues,
} from "@/types/facility";
import apiClient from "../lib/apiClient";
import { buildFormData } from "@/utils/buildFormData";
import { adaptFacilityPayload } from "@/utils/adaptFacilityPayload";
import { buildFacilityFormData } from "@/utils/buildFacilityFormData";
import { toBEDate } from "@/utils/formatDate";
import { format } from "date-fns";
export const facilityAPI = {
  // 1. API Get /facilities
  facilityList: async (
    params: FacilityParam
  ): Promise<FacilityListResponse> => {
    const { data } = await apiClient.get("/facilities", { params });
    return {
      data: data.data,
    };
  },

  // 2. API Get /facility-types
  facilityTypeList: async (): Promise<FacilityTypeListResponse> => {
    const { data } = await apiClient.get("/facility-types");
    return {
      data: data.data,
    };
  },

  // 3. API Get /facilities/:id
  facilityDetail: async (id: string) => {
    const response = await apiClient.get(`/facilities/${id}`);
    return response.data;
  },

  // 4. API Get /facility-types/:id
  facilityTypeDetail: async (id: string) => {
    const response = await apiClient.get(`/facility-types/${id}`);
    return response.data;
  },

  // 5. API Post /facilities
  // createFacility: async (payload: FacilityFormValues) => {
  //   // const adapted = adaptFacilityPayload(payload);
  //   const formData = buildFacilityFormData(payload);
  //   // const response = await apiClient.post("/facilities", formData, {
  //   //   headers: { "Content-Type": "multipart/form-data" },
  //   // });
  //       const response = await apiClient.post("/facilities", formData); // KHÔNG SET HEADERS

  //   return response.data;
  // },

  createFacility: async (values: FacilityFormValues) => {
    // BE yêu cầu dd-MM-yyyy
    const installedFormatted = values.installed
      ? format(new Date(values.installed), "dd-MM-yyyy")
      : "";

    const payload = {
      name: values.name,
      description: values.description,
      img:
        values.img && values.img.length > 0 && values.img[0] instanceof File
          ? (values.img[0] as File)
          : undefined,

      type_id: values.type_id,
      status: values.status,
      installed: installedFormatted,

      operating_hours: {
        opening_time: values.opening_time,
        closing_time: values.closing_time,
        operation_days: values.operation_days,
      },
      slot_settings: {
        slot_length_minutes: values.slot_length_minutes,
        buffer_time_minutes: values.buffer_time_minutes,
        max_slots_per_day: values.max_slots_per_day,
      },
      booking_limit: {
        advance_booking_limit_days: values.advance_booking_limit_days,
        max_booking_per_week: values.max_booking_per_week,
      },
      cancel_policy: {
        deadline_hours_before: values.deadline_hours_before,
        max_cancel_per_week: values.max_cancel_per_week,
        penalty_type: values.penalty_type,
        ban_duration_days: values.ban_duration_days,
        late_cancel_refund_rate: values.late_cancel_refund_rate,
      },
      fee: {
        booking_fee_vnd: values.booking_fee_vnd,
        refund_policy: values.refund_policy,
        refund_rate: values.refund_rate,
      },
    };

    const formData = buildFacilityFormData(payload);

    return apiClient.post("/facilities", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 6. API Post /facility-types
  createFacilityType: async (payload: { name: string }) => {
    const { data } = await apiClient.post("/facility-types", payload);
    return data;
  },

  // 7. API Patch /facilities/:id
  updateFacility: async (id: string, values: FacilityFormValues) => {
    // BE yêu cầu dd-MM-yyyy
    const installedFormatted = values.installed
      ? format(new Date(values.installed), "dd-MM-yyyy")
      : "";

    const payload = {
      name: values.name,
      description: values.description,
      img:
        values.img && values.img.length > 0 && values.img[0] instanceof File
          ? (values.img[0] as File)
          : undefined,

      type_id: values.type_id,
      status: values.status,
      installed: installedFormatted,

      operating_hours: {
        opening_time: values.opening_time,
        closing_time: values.closing_time,
        operation_days: values.operation_days,
      },
      slot_settings: {
        slot_length_minutes: values.slot_length_minutes,
        buffer_time_minutes: values.buffer_time_minutes,
        max_slots_per_day: values.max_slots_per_day,
      },
      booking_limit: {
        advance_booking_limit_days: values.advance_booking_limit_days,
        max_booking_per_week: values.max_booking_per_week,
      },
      cancel_policy: {
        deadline_hours_before: values.deadline_hours_before,
        max_cancel_per_week: values.max_cancel_per_week,
        penalty_type: values.penalty_type,
        ban_duration_days: values.ban_duration_days,
        late_cancel_refund_rate: values.late_cancel_refund_rate,
      },
      fee: {
        booking_fee_vnd: values.booking_fee_vnd,
        refund_policy: values.refund_policy,
        refund_rate: values.refund_rate,
      },
    };

    const formData = buildFacilityFormData(payload);

    return apiClient.patch(`/facilities/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 8. API Patch /facility-types/:id
  updateFacilityType: async (id: string, payload: { name: string }) => {
    const response = await apiClient.patch(`/facility-types/${id}`, payload);
    return response.data;
  },

  // 9. API Delete /facilities/:id

  // 10. API Delete /facility-types/:id
  // Không cần call API Delete riêng lẻ cho facility-types nữa mà dùng chung deleteResourceAPI
};
