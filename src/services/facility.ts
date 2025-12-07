import {
  FacilityParam,
  FacilityListResponse,
  FacilityTypeListResponse,
  FacilityData,
} from "@/types/facility";
import apiClient from "../lib/apiClient";
export const facilityAPI = {
  // 1. API Get /facilities
  facilityList: async (
    params: FacilityParam
  ): Promise<FacilityListResponse> => {
    const { data } = await apiClient.get("/facilities", { params });
    return {
      data: data.data,
    };
  },

  // 2. API Get /facility-types
  facilityTypeList: async (): Promise<FacilityTypeListResponse> => {
    const { data } = await apiClient.get("/facility-types");
    return {
      data: data.data,
    };
  },

  // 3. API Get /facilities/:id

  // 4. API Get /facility-types/:id
  facilityTypeDetail: async (id: string) => {
    const response = await apiClient.get(`/facility-types/${id}`);
    return response.data;
  },

  // 5. API Post /facilities

  // 6. API Post /facility-types
  createFacilityType: async (payload: { name: string }) => {
    const { data } = await apiClient.post("/facility-types", payload);
    return data;
  },

  // 7. API Patch /facilities/:id

  // 8. API Patch /facility-types/:id
  updateFacilityType: async (id: string, payload: { name: string }) => {
    const response = await apiClient.patch(`/facility-types/${id}`, payload);
    return response.data;
  },

  // 9. API Delete /facilities/:id

  // 10. API Delete /facility-types/:id
  // Không cần call API Delete riêng lẻ cho facility-types nữa mà dùng chung deleteResourceAPI
};
