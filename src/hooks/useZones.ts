import { MetaProps } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { ZonesResponse } from "@/types/zone";
import { zoneAPI } from "@/services/zoneAPI";
export function useZonesQuery(params: MetaProps, options?: { enabled?: boolean }) {
  return useQuery<ZonesResponse>({
    queryKey: ["zones", params],
    queryFn: () => zoneAPI.zones(params),
    placeholderData: (previousData) => previousData,
    enabled: options?.enabled ?? true,
  });
}