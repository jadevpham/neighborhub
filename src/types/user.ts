import { MetaProps } from "./common";
import { Site } from "./site";
import { Zone } from "./zone";
export interface User {
  user: {
    id?: string;
    name: string;
    role: string;
    email: string;
    password?: string;
    phone: string | null;
    avatar: string | null;
    status: number;
    dob?: string | null;
    gender?: string | null;
    title?: string | null;
    joined_at?: string;
    updated_at?: string | null;
    created_by?: {
      id: string;
      name: string;
      role: string;
    };
    updated_by?: {
      id: string;
      name: string;
      role: string;
    };
  };
  scope: {
    site?: Site;
    zone?: Zone;
  };
}
export interface UserResponse {
  data: User;
}
export interface UsersResponse {
  meta: MetaProps;
  data: User[];
}

export interface UserParam {
  meta: MetaProps;
  role?: string | null;
  site_id?: string | null;
  zone_id?: string | null;
  status?: number | null;
  search?: string | null;
}

// Dành cho UI component
interface Option {
  value: string;
  label: string;
}

export interface UserSearchFilterProps {
  currentRole: "system_admin" | "site_admin";
  sites?: Option[];
  zones?: Option[];
  onFilterChange: (filters: Omit<UserParam, "meta">) => void;
}

export interface UpdateUserPayload {
  email: string;
  status: number;
}
export interface EditUserModalProps {
  id: string;
  userInfo: UpdateUserPayload;
  onClose: () => void;
  onSaved?: () => void;
}
export interface UserCardProps {
  user: User;
  onEdit?: () => void;
}