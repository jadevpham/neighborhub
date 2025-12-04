import apiClient from "../lib/apiClient";
import { NewsDetailResponse, NewsListResponse, NewsParam } from "@/types/news";
import { buildFormData } from "@/utils/buildFormData";
import { NewsPayload } from "@/types/news";
export const newsAPI = {
  // 1. API Get /news
  newsList: async (params: NewsParam): Promise<NewsListResponse> => {
    const { data } = await apiClient.get("/news", { params });
    return {
      meta: data.meta,
      data: data.data,
    };
  },

  // 2. API Get /news/:id
  newsDetail: async (id: string): Promise<NewsDetailResponse> => {
    const response = await apiClient.get<NewsDetailResponse>(`/news/${id}`);
    return response.data;
  },

  // 3. API Post /news
  createNews: async (payload: NewsPayload) => {
    const formData = buildFormData(payload);
    const response = await apiClient.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 4. API Patch /news/:id
  updateNews: async (id: string, payload: NewsPayload) => {
    const formData = buildFormData(payload);
    const response = await apiClient.patch(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 5. API Delete /news/:id
  // Không cần call API Delete riêng lẻ cho news nữa mà dùng chung deleteResourceAPI
};
