
import { MetaProps } from "./common";

export enum ReferendumStatus {
    Delete = 0,
    Active = 1,
    Closed = 2,
}

export interface ReferendumData {
    referendum_id: string,
    title: string,
    status: number | null,
    site_name: string,
    zone_name: string,
    creator_name: string,
    user_vote_status: boolean,
    created_at: string,
}

export interface ReferendumPayload {
    title: string,
    description: string;
    settings: {
        is_anonymous: boolean,
        allow_multiple_choice: boolean,
        allow_change_vote: boolean,
    },
    options:
    {
        label: string,
        description: string,
        order_index: number,
    }[],
}

export interface ReferendumDetailData extends ReferendumData {
    //id: string; // BE sửa thành referendum_id thì xóa
    description: string;
    // site_id: string;   // BE sủa thành site_name, zone_name thì xóa
    // zone_id: string;
    // site_name: string;   // BE sủa thành site_name, zone_name thì dùng
    // zone_name: string;
    settings: {
        is_anonymous: boolean,
        allow_multiple_choice: boolean,
        allow_change_vote: boolean,
    },
    options:
    {
        id: string,
        label: string,
        description: string,
        order_index: number,
        vote_count: number,
        percentage: number,
    }[],
    total_votes: number
}

export interface ReferendumParam extends MetaProps {
    search: string | null;
    status: number | null;
}

export interface ReferendumListResponse {
    meta: MetaProps;
    data: ReferendumData[];
}
export interface ReferendumSearchFilterProps {
    filters: ReferendumParam;
    onFilterChange: (filters: ReferendumParam) => void;
}

export interface ReferendumDeletePayload {
    reason: string;
}
