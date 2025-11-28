import { MetaProps } from "./common";

export interface Site {
  id?: string;
  name?: string | null;
  address?: string | null;
  logo?: string | null;
  description?: string | null;
}

export interface SitesResponse {
  meta: MetaProps;
  data: Site[];
}