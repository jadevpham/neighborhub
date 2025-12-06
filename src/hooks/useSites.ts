import { MetaProps } from "@/types/common";
import { SitesResponse } from "@/types/site";
import { useQuery } from "@tanstack/react-query";
import { siteAPI } from "@/services/siteAPI";
export function useSitesQuery(params: MetaProps, options?: { enabled?: boolean }) {
  return useQuery<SitesResponse>({
    queryKey: ["sites", params],
    queryFn: () => siteAPI.sites(params),
    placeholderData: (previousData) => previousData,
    enabled: options?.enabled ?? true,
  });
}