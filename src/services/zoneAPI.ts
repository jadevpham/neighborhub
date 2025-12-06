import { MetaProps } from "@/types/common";
import { ZonesResponse } from "@/types/zone";
import apiClient from "../lib/apiClient";

export const zoneAPI = {
  // 1. API Get /zones
  zones: async (params: MetaProps): Promise<ZonesResponse> => {
    const response = await apiClient.get("/zones", { params });
    return response.data;
  },
};
