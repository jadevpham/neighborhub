import { MetaProps } from "@/types/common";
import apiClient from "../lib/apiClient";
import {
  UpdateResidentPayload,
  ResidentResponse,
  ResidentsResponse,
  ResidentParam,
} from "@/types/resident";

export const residentAPI = {
  // 1. API Get /residents
  residents: async (params: ResidentParam): Promise<ResidentsResponse> => {
    const { data } = await apiClient.get("/residents", { params });
    return {
      meta: data.meta,
      data: data.data,
    };
  },
  // 2. API Get /residents/:id
  resident: async (id: string): Promise<ResidentResponse> => {
    const response = await apiClient.get<ResidentResponse>(`/residents/${id}`);
    return response.data;
  },
  // 3. API Patch /residents/:id
  updateResident: async ({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateResidentPayload;
  }) => {
    const response = await apiClient.patch(`/residents/${id}`, payload);
    return response.data;
  },
  // 4. API Delete /residents/:id
  // Không cần call API Delete riêng lẻ cho user nữa mà dùng chung deleteResourceAPI
};
