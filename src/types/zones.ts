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