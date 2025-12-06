import { MetaProps } from "./common";
import { Apartment, ZoneResident } from "./zone";
export interface ResidentData {
  id?: string;
  name?: string | null;
  avatar?: string | null;
  email?: string | null;
  phone?: string | null;
  status_resident?: number;
  dob?: string | null;
  gender?: string | null;
  registration_at?: string;
  updated_at?: string | null;
  approval_at?: string;
}

export interface ResidentResponse {
  data: {
    resident: ResidentData;
    scope: ZoneResident;
  };
}

export interface ResidentsResponse {
  meta: MetaProps;
  data: ResidentData[];
}

export interface ResidentParam extends MetaProps{
  zone_id?: string | null;
  status_resident?: number | null;
  registration_from?: string | null; // format: DD-MM-YYYY
  registration_to?: string | null; // format: DD-MM-YYYY
  approval_from?: string | null; // format: DD-MM-YYYY
  approval_to?: string | null; // format: DD-MM-YYYY
  search?: string | null; // by name, apartment, email, or phone
}

export interface UpdateResidentPayload {
  apartment: Apartment[]; // chỉ lấy trường: id, status_apartment, reject_reason của apartment
}

export interface ResidentSearchFilterProps {
  onFilterChange: (filters: any) => void;
}