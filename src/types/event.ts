import { number } from "framer-motion";
import { Site } from "./site";
import { Zone } from "./zone";
import { FileAttachment } from "./common";

export interface UserBy {
    id?: string;
    name?: string | null;
    role?: string | null;
    avatar?: string | null;
    scope?: {
        site?: Site;
        zone?: Zone;
    }
}

export interface EventData {
    id?: string;
    title?: string | null;
    description?: string | null;
    type?: string | null;
    start_time?: string | null;
    end_time?: string | null;
    created_at?: string | null;
    created_by?: UserBy;
    updated_at?: string | null;
    updated_by?: UserBy;
    approval_at?: string | null;
    approval_by?: UserBy;
    approval_note?: string | null;
    cancelled_at?: string | null;
    cancelled_by?: UserBy;
    cancel_reason?: string | null;
    visibility?: string | null;
    // site_id?: 
    // zone_id?: 
    // status?:
    scope_level?: string | null; // Enum: site: Event do site_admin quản lý, zone: Event do management_board quản lý, partner: Event của partner gửi request
    approval_required?: boolean;  
    approval_status?: number; // Enum

    
    attachments?: FileAttachment[];
    max_participants?: number;
    
}