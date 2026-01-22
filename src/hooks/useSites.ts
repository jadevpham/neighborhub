import { MetaProps } from "@/types/common";
import { SiteParams, SitesResponse } from "@/types/site";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { siteAPI } from "@/services/siteAPI";
export function useSitesQuery(params?: SiteParams, options?: { enabled?: boolean }) {
  return useQuery<SitesResponse>({
    queryKey: ["sites", params],
    queryFn: () => siteAPI.sites(params),
    placeholderData: (previousData) => previousData,
    enabled: options?.enabled ?? true,
  });
}

export function useSitesPartnerQuery(params?: SiteParams, options?: { enabled?: boolean }) {
  return useQuery<SitesResponse>({
    queryKey: ["sitesPartner", params],
    queryFn: () => siteAPI.sitesPartner(params),
    placeholderData: (previousData) => previousData,
    enabled: options?.enabled ?? true,
  });
}
