import apiClient from "@/lib/apiClient";
import { MetaProps } from "@/types/common";
import { SitesResponse } from "@/types/site";


export const siteAPI = {
    // 1. API Get sites
    sites: async (params: MetaProps): Promise<SitesResponse> =>  {
        const response = await apiClient.get("/sites", {params});
        return response.data;
    },
};