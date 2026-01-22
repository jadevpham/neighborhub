import apiClient from "@/lib/apiClient";
import { MetaProps } from "@/types/common";
import { SitesResponse, SiteParams } from "@/types/site";


export const siteAPI = {
    // 1. API Get /sites - cho system admin
    sites: async (params?: SiteParams): Promise<SitesResponse> => {
        const response = await apiClient.get("/sites", { params });
        return response.data;
    },

    // 2. API Get /sites/public - cho partner
    sitesPartner: async (params?: SiteParams): Promise<SitesResponse> => {
        const response = await apiClient.get("/sites/public", { params });
        return response.data;
    },
};