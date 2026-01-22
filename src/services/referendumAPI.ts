import { ReferendumData, ReferendumParam, ReferendumListResponse, ReferendumPayload, ReferendumDeletePayload } from './../types/referendum';
import apiClient from "@/lib/apiClient";


export const referendumAPI = {
  // 1. API Get /referendums
  referentdumList: async (params: ReferendumParam): Promise<ReferendumListResponse> => {
    const { data } = await apiClient.get("/referendums", { params });
    return {
      meta: data.meta,
      data: data.data,
    };
  },

  // 2. API Post /referendums 
  createReferendum: async (payload: ReferendumPayload) => {
    const response = await apiClient.post(`/referendums/`, payload);
    return response.data;
  },

  // 3. API Get /rereferendums/:referendumsId
  referendumDetail: async (referendumId: string) => {
    const response = await apiClient.get(`/referendums/${referendumId}`);
    return response.data.data;
  },

  // 4. API Patch /rereferendums/:referendumsId/close
  closeReferendum: async (referendumId: string) => {
    const response = await apiClient.patch(`/referendums/${referendumId}/close`);
    return response.data;
  },

  // 5. API Delete /rereferendums/:referendumsId/delete
  deleteReferendum: async (referendumId: string, payload: ReferendumDeletePayload) => {
    const response = await apiClient.delete(`/referendums/${referendumId}/delete`, {
      data: payload,
    });
    return response.data;
  },
}