import { CalendarViewMode } from "@/constants/calendar";
import dayjs from "dayjs";
export interface UserRef {
  id?: string;
  name?: string | null;
  avatar?: string | null;
  role?: string | null;
  phone?: string | null;
  action_at?: string | null;
  cancel_reason?: string | null;
}

export interface BookingSlotData {
  id?: string;
  status?: number | null; // ENUM: 0 - blocked, 1 - booked_by_resident, 2 - booked_by_samb, 3 - cancelled_by_resident, 4 - cancelled_by_samb, null - chưa từng được SAMB/resident booking/cancel/block lần nào
  start?: string | null; // date time
  end?: string | null; // date time
  actor?: UserRef;
}

export interface BookingSlotParam {
  id?: string; // id của facility chứ không phải id của booking slot
  from?: string | null; // date, vd: ?from=DD-MM-YYYY&to=DD-MM-YYYY
  to?: string | null;
}

export interface BookingSlotListResponse {
  data?: BookingSlotData[];
}

// POST: null -> 0 (SAMB block slot, action: blocked_by_samb), null -> 1 (resident booking slot, action: booked_by_resident), null -> 2 (SAMB booking slot for partner/SAMB/..., action: booked_by_samb),
// PATCH: 0 -> null (SAMB hủy block slot, action: unblocked_by_samb), 1 -> 3 (resident cancel slot resident booked, action: cancelled_by_resident), 1 -> 4 (SAMB cancel slot resident booked, action: cancelled_by_samb),
// 2 -> 4 (SAMB cancel slot SAMB booked, action: cancelled_by_samb), 3 -> 0 (SAMB can block slot cancelled because this slot is avalible, action: blocked_by_sam ), 3 -> 1 (resident can book slot cancelled because this slot is avalible, action: booked_by_resident ),
// 3 -> 2 (SAMB can book slot cancelled because this slot is avalible, action: booked_by_samb )
// 4 -> 0 (SAMB can block slot cancelled because this slot is avalible, action: blocked_by_samb ), 4 -> 1 (resident can book slot cancelled because this slot is avalible, action: booked_by_resident ),
// 4 -> 2 (SAMB can book slot cancelled because this slot is avalible, action: booked_by_samb )
// BE trả booking slot với mọi status,
// Trong page calendar FE WEB (for SAMB) chỉ hiển thị các slot 0, 1, 2 để SAMB block/booking/cancel slot, còn 3, 4 sẽ hiển ở page list slot cancelled khác,
// Trong page calendar FE Mobile (for resident) chỉ hiển thị các slot 0, 1, 2 để resident booking/cancel slot, còn 1, 3 thì sẽ hiện ở page history booked - cancel của resident, không cần hiện 4

export type BookingSlotAction =
  | "booked_by_resident"
  | "booked_by_samb"
  | "cancelled_by_resident"
  | "cancelled_by_samb"
  | "blocked_by_samb"
  | "unblocked_by_samb";

export interface BookingSlotHistoryData {
  id?: string; // id của history record
  slot_id?: string; // liên kết về booking slot hiện tại
  action?: BookingSlotAction | null; // ENUM: "blocked_by_samb" "booked_by_resident" "booked_by_samb" "cancelled_by_resident" "cancelled_by_samb" "unblocked_by_samb" được ghi log lại sau khi post patch slot
  action_at?: string | null;
  actor_id?: string | null;
  actor_name?: string | null;
  actor_role?: string | null;
  cancel_reason?: string | null; // lý do cancel nếu có
}

export interface BookingSlotHistoryParam {
  id?: string; // id của booking slot
  from?: string | null; // date, vd: ?from=DD-MM-YYYY&to=DD-MM-YYYY
  to?: string | null;
}

export interface BookingSlotHistoryResponse {
  data: BookingSlotHistoryData[];
}

export interface BookingCalendarToolbarProps {
  viewMode: CalendarViewMode;
  onViewModeChange: (v: CalendarViewMode) => void;
  from: string;
  to: string;
  onDateChange: (from: string, to: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export interface BaseCalendarProps {
  slots: BookingSlotData[];
  calendarDates: dayjs.Dayjs[];
}

export interface BookingCalendarWeekProps extends BaseCalendarProps {
  timeSlots: string[];
  stepMinutes: number;
  forceDayMode?: boolean;
}

export interface BookingCalendarMonthProps extends BaseCalendarProps {}

export interface BookingCalendarProps extends BaseCalendarProps {
  timeSlots: string[];
  stepMinutes: number;
  viewMode: CalendarViewMode;
}

export interface TimeRowProps extends BaseCalendarProps {
  time: string;
  stepMinutes: number;
  onSlotClick: (slotId: string) => void;
}

export interface SlotCardProps {
  slot: BookingSlotData;
  onClick: () => void;
}

export interface BookingSlotHistoryPanelProps {
  slot_id: string;
  onClose: () => void;
}
