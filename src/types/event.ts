import { OrderData } from './event';
// import { EventData } from "./event";
import { number } from "framer-motion";
import { Site } from "./site";
import { Zone } from "./zone";
import { FileAttachment } from "./common";
import { MetaProps } from "./common";
import { FieldValues } from "react-hook-form";

export enum EventStatus {
  Draft = 0,
  Pending = 1,
  Rejected = 2,
  Active = 3,
  PendingCancellation = 4,
  Cancelled = 5,
  Deleted = 6,
}
export type EventPageMode = "create" | "detail" | "edit";
export interface EventEditorPageProps {
  mode: "create" | "detail" | "edit";
  eventId?: string;
}

export interface EventData {
  event_id: string;
  event_title: string | null;
  status: number; // Event status: 0 Draft 1 Pending 2 Rejected 3 Active 4 PendingCancellation 5 Cancelled 6 Deleted
  hash_tags: string[];
  cover_image_url: string | null;
  files: FileAttachment;
  location: {
    siteId: string | null;
    siteName: string | null;
    zoneId: string | null;
    zoneName: string | null;
  };
  overall_start_date: string | null;
  overall_end_date: string | null;
  created_by: string | null;
  updated_at: string | null;
}

export interface EventParam extends MetaProps {
  search: string | null;
  status: number | null;
  start_date: string | null; // date-time
  end_date: string | null; // date-time
}
export interface EventSearchFilterProps {
  filters: EventParam;
  onFilterChange: (filters: EventParam) => void;
}
export interface EventListResponse {
  meta: MetaProps;
  data: EventData[];
}

export type EventDetailResponse = EventData &
{
  ticket_types: EventTicketData[];
  overview_description: string | null;
  est_attendees: string | null;
};

export interface EventPayload {
  // // gửi BE dạng multipart/form-data
  // scope_type?: string;
  location?: string; // int64 nhưng swagger cho string
  event_title: string;
  overview_description?: string;
  cover_image?: File; // binary file
  files?: File;
  start_date: string; // ISO date-time
  end_date: string; // ISO date-time
  est_attendees: string; // swagger bắt string
  hash_tag?: string[]; // array
}
export enum TicketType {
  PAID = 0,
  FREE = 1,
  THIRD_PARTY = 2,
  AT_DOOR = 3,
}

export interface EventTicketPayload extends FieldValues {
  type?: number | null;
  quantity?: number | null;
  ticket_name?: string | null;
  price?: number | null;
  currency?: string | null;
  // url_third_party: string | null;
  url_third_party: string[]; //BE sau khi sửa thì chuyển sang mảng này
  ticket_sales_opening_time?: {
    start_time: string | null;
    end_time: string | null;
  };
  ticket_per_order?: {
    min: number | null;
    max: number | null;
  };
}

export interface EventTicketParam {
  id: string;
  data: EventTicketPayload;
}

export interface EventTicketData {
  type?: number | null;
  quantity?: number | null;
  ticket_name?: string | null;
  price?: number | null;
  currency?: string | null;
  url_third_party?: string[];
  ticket_sales_opening_time?: {
    start_time: string | null;
    end_time: string | null;
  };
  ticket_per_order?: {
    min: number | null;
    max: number | null;
  };
  event_ticket_type_id?: string;
  event_id?: string;
  status?: number | null; // Enum: 1 - active, 2 - checked_in, 3 - cancelled
  created_at?: string | null;
}

export interface EventTicketResponse extends EventTicketData { }

export enum CreateEventStep {
  BUILD = "BUILD",
  TICKET = "TICKET",
  PUBLISH = "PUBLISH",
}
export interface EventCreateSidebarProps {
  currentStep: CreateEventStep;
  onStepChange: (step: CreateEventStep) => void;
  event?: EventDetailResponse | null;
}
export interface EventCreateFormProps {
  event?: EventDetailResponse | null;
  onSuccess?: (event: EventDetailResponse) => void;
  readonly?: boolean;
}

export interface EventTicketCreateFormProps {
  eventId: string;
  onSuccess?: () => void;

  readonly?: boolean;
  ticket?: any | null;
  onCreated?: (ticketId: string) => void;
  onUpdated?: () => void;
  onDeleted?: () => void;
}

// export interface EventFormValues {
//   scope_type?: string;
//   location?: string;
//   event_title: string;
//   overview_description: string;
//   start_date: string;
//   end_date: string;
//   est_attendees: string;
//   hash_tag: string; // input text
// }
// export interface EventResponse {
//   event_id: string;
//   status: number;

//   location: {
//     siteId?: string;
//     siteName?: string;
//     zoneId?: string;
//     zoneName?: string;
//   };

//   created_by?: string;

//   event_title: string;
//   overview_description: string;

//   cover_image_url: string;

//   overall_start_date: string;
//   overall_end_date: string;

//   est_attendees: string;
//   hash_tag: string[];

//   ticket_types?: EventTicketData[];

//   updated_at?: string;
// }


export interface AttachmentCardProps {
  value?: FileAttachment;              // file từ BE (event.files)
  localFile?: File;                    // file user vừa chọn
  readonly?: boolean;

  onSelectFile?: (file: File) => void; // khi user chọn file mới
  onRemove?: () => void;               // khi remove
}

export interface EventTicketStepProps {
  event: EventDetailResponse;
  mode: "create" | "edit" | "detail";
  onRefresh?: () => void; // gọi invalidate/refetch event detail
}

export interface EventCancelRequestPayload {
  reason: string;
}

export interface EventRejectPayload {
  reason: string;
}

export interface OrderParams extends MetaProps {
  id: string;
  search: string;
  status: string;
}

export interface OrderData {
  order_id: string,
  buyer_info: {
    buyer_name: string,
    buyer_phone: string,
    buyer_email: string
  },
  order_items:
  {
    ticket_type_id: string,
    ticket_type_name: string,
    quantity: number,
    unit_price: number,
    sub_total: number,
  }[],
  total_amount: number,
  currency: string,
  status: number,
  ordered_date: string,
}

export interface OrderResponse {
  meta: MetaProps;
  data: OrderData;
}