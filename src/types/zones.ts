import { MetaProps } from "./common";

export interface Zone {
  id?: string;
  name?: string | null;
  address?: string | null;
  emergency_contact?: string | null;
}
export interface ZonesResponse {
  meta: MetaProps;
  data: Zone[];
}

export interface Apartment {
  id?: string;
  name?: string | null;
  documents?: {
    temporary_resident_certificate: any[] | null;
    apartment_lease_contract: any[] | null;
    apartment_ownership_certificate: any[] | null;
  };
  resident_type?: number;
  status_appartment?: number;  //BE sai chính tả status_apartment
  status_apartment?: number;
  reject_reason?: string | null;
}

export interface ZoneResident {
  zone: {
    id: string;
    name: string | null;
    apartment: Apartment[];
  }[];
}
