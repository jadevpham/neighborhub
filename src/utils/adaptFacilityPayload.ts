import { FacilityFormValues } from "@/types/facility";
export function adaptFacilityPayload(v: FacilityFormValues) {
    const toDDMMYYYY = (dateStr: string) => {
      if (!dateStr) return "";
      const [y, m, d] = dateStr.split("-");
      return `${d}-${m}-${y}`;
    };
  
    return {
      Json: JSON.stringify({
        name: v.name,
        description: v.description,
        type_id: v.type_id,
        status: v.status,
        installed: toDDMMYYYY(v.installed),
  
        operating_hours: {
          opening_time: v.opening_time,
          closing_time: v.closing_time,
          operation_days: v.operation_days,
        },
  
        slot_settings: {
          slot_length_minutes: v.slot_length_minutes,
          buffer_time_minutes: v.buffer_time_minutes,
          max_slots_per_day: v.max_slots_per_day,
        },
  
        booking_limit: {
          advance_booking_limit_days: v.advance_booking_limit_days,
          max_booking_per_week: v.max_booking_per_week,
        },
  
        cancel_policy: {
          deadline_hours_before: v.deadline_hours_before,
          max_cancel_per_week: v.max_cancel_per_week,
          penalty_type: v.penalty_type,
          ban_duration_days: v.ban_duration_days,
          late_cancel_refund_rate: v.late_cancel_refund_rate,
        },
  
        fee: {
          booking_fee_vnd: v.booking_fee_vnd,
          refund_policy: v.refund_policy,
          refund_rate: v.refund_rate,
        }
      }),
  
      img: v.img
    };
  }
  