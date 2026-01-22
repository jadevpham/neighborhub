import { MetaProps } from "./common";

export interface Site {
  id?: string;
  name?: string | null;
  siteId?: string;   // API /sites/public dùng
  siteName?: string;  // API /sites/public dùng
  address?: string | null;
  logo?: string | null;
  description?: string | null;
}

export interface SitesResponse {
  meta: MetaProps;
  data: Site[];
}

export interface SiteParams extends MetaProps {
  search?: string;
  status?: number;
}