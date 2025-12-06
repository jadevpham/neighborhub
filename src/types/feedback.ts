import { FileAttachment, MetaProps } from "./common";
import { Zone } from "./zone";

export interface ResponseFeedback {
  id?: string;
  content?: string | null;
  responded_at?: string | null;
  type?: number;
  responder?: {
    id?: string;
    name?: string | null;
    avatar?: string | null;
    role?: string | null;
  };
  attachments?: FileAttachment[];
}
export interface FeedbackData {
  id?: string;
  title?: string | null;
  status?: number; // Enum;
  category?: number; // Enum;
  created_at: string | null;
  updated_at?: string | null;
  is_anonymous?: boolean;
  resident?: {
    id?: string;
    name?: string | null;
    avatar?: string;
    zones?: Zone[];
  };

  // Feedback detail
  content?: string | null;
  priority?: number;
  attachments?: FileAttachment[];
  responses?: ResponseFeedback[];
  activity_logs?: {
    activity_name?: string | null;
    performed_at?: string | null;
  }[]
}
export interface FeedbackParam extends MetaProps {
  search?: string | null; // by title name
  status?: number | null;
  category?: number | null;
}

export interface FeedbackSearchFilterProps {
  filters: FeedbackParam;
  onFilterChange: (filters: FeedbackParam) => void;
}
export interface FeedbackListResponse {
  meta: MetaProps;
  data: FeedbackData[];
}

export interface FeedbackDetailResponse {
  data: FeedbackData;
}

export interface FeedbackPayload {
    // For API Patch
    category?: number;
    priority?: number;
    // For API Post
    content?: string | null;
    type?: number;
    files?: globalThis.File[];
}