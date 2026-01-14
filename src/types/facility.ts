export interface FacilityData {
  id?: string;
  name?: string | null;
  description?: string | null;
  status?: number | null;
  type?: string | null; // là facility type name
  type_id?: string | null;
  img?: string | null;
}

export interface FacilityTypeData {
  id?: string;
  name?: string | null;
  level: string | null;
  site_name?: string | null;
  zone_name?: string | null;
  status?: number | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_by?: string | null;
  updated_at?: string | null;
}

export interface FacilityParam {
  search?: string | null; // Search by facility name or description.
  status?: number | null;
  type_id?: string | null;
}

export interface FacilitySearchFilterProps {
  filters: FacilityParam;
  onFilterChange: (filters: FacilityParam) => void;
}

export interface FacilityListResponse {
  data: FacilityData[];
}

export interface FacilityTypeListResponse {
  data: FacilityTypeData[];
}

export interface FacilityTypeDetailPanelProps {
  item: FacilityTypeData;
  onClose: () => void;
}

export interface AddListButtonProps {
  onCreated?: (t: FacilityTypeData) => void;
}

export interface FacilityColumnProps {
  type: FacilityTypeData;
  items: FacilityData[];
  onShowDetail: () => void;
  onEdit: (type: FacilityTypeData) => void;
}

export interface FacilityTypePayload {
  id: string;
  name: string;
}
export interface FacilityPayload extends FacilityFormData {
  operating_hours: {
    opening_time: string | null;
    closing_time: string | null;
    operation_days: string[];
  };
  slot_settings: {
    slot_length_minutes: number | null; // Thời lượng 1 slot (phút)
    buffer_time_minutes: number | null; // Thời gian nghỉ giữa 2 slot (phút)
    max_slots_per_day: number | null; // Giới hạn số slot/ngày
  };
  booking_limit: {
    advance_booking_limit_days: number | null; // Đặt trước tối đa bao nhiêu ngày
    max_booking_per_week: number | null; // Số lần đặt tối đa mỗi tuần
  };
  cancel_policy: {
    deadline_hours_before: number | null; // Số giờ trước slot được phép hủy
    max_cancel_per_week: number | null; // Số lần hủy tối đa/tuần
    penalty_type: number | null; // (enum: 0 - temporary_ban | 1 - refund_reduction | 2 - warning_only | 3 - none)",
    ban_duration_days: number | null; // Số ngày bị cấm booking (nếu có)
    late_cancel_refund_rate: number | null; // Tỷ lệ hoàn tiền khi hủy trễ (từ 0-1)
  };
  fee: {
    booking_fee_vnd: number | null; // Phí đặt (VND)
    refund_policy: number | null; // (enum: 0 - full_refund | 1 - partial_refund | 2 - no_refund)",
    refund_rate: number | null; // Tỷ lệ hoàn tiền nếu partial_refund
  };
}

export interface CreateUpdateFacilityTypeModalPopupProps {
  open: boolean;
  initialName?: string;
  title: string;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: (name: string) => void;
  onClose: () => void;
}
export interface FacilityFormData {
  name: string;
  description: string;
  img: string | null;
  type_id: string;
  status: number; // 0 - maintenance, 1 - active
  installed: string; // yyyy-MM-dd
}
// Ảnh facility có thể là URL (string) hoặc File upload
export type FacilityImage = string | File;

// Form values (flat fields) cho create/update facility
export interface FacilityFormValues {
  name: string;
  description: string;
  img: FacilityImage[];

  type_id: string; // lấy từ context type

  status: number; // 0 - maintenance, 1 - active. // Status của facility. Lưu ý khi 1 facility đang active mà chuyển về maintenance thì SA, MB phải vào booking slot cancel tất cả những slot đã booking rồi mới chuyển về maintanance
  installed: string; // yyyy-MM-dd

  // Operating Hours
  opening_time: string; // "HH:mm"
  closing_time: string; // "HH:mm"
  operation_days: string[]; // ["Mon", "Tue", ...]

  // Slot Settings
  slot_length_minutes: number;
  buffer_time_minutes: number;
  max_slots_per_day: number;

  // Booking Limit
  advance_booking_limit_days: number;
  max_booking_per_week: number;

  // Cancel Policy
  deadline_hours_before: number;
  max_cancel_per_week: number;
  penalty_type: number; // 0..3
  ban_duration_days: number | null;
  late_cancel_refund_rate: number; // 0–1

  // Fee
  booking_fee_vnd: number;
  refund_policy: number; // 0..2
  refund_rate: number; // 0–1
}

// Hàm update field type-safe
export type UpdateFacilityFieldFn = <K extends keyof FacilityFormValues>(
  key: K,
  value: FacilityFormValues[K]
) => void;

// Props chung cho các section con
export interface FacilityFormSectionProps {
  form: FacilityFormValues;
  updateField: UpdateFacilityFieldFn;
}

// Submit bar
export interface FacilitySubmitBarProps {
  mode: "create" | "update";
  loading: boolean;
  onSubmit: () => void;
  facilityId?: string;
}

// Photos
export interface FacilityPhotosProps {
  images: FacilityImage[];
  onChange: (imgs: FacilityImage[]) => void;
}

// Information section
export interface FacilityInformationProps {
  form: FacilityFormValues;
  updateField: UpdateFacilityFieldFn;
  isUpdate?: boolean;
}

export interface FacilityFormProps {
  mode: "create" | "update";
  initialValues?: Partial<FacilityFormValues>;
  loading?: boolean;
  onSubmit: (values: FacilityFormValues) => void;
  facilityId?: string;
}
