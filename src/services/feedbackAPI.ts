import {
  FeedbackDetailResponse,
  FeedbackListResponse,
  FeedbackParam,
  FeedbackPayload,
} from "@/types/feedback";
import apiClient from "../lib/apiClient";
import { buildFormData } from "@/utils/buildFormData";

export const feedbackAPI = {
  // 1. API Get /feedbacks
  feedbackList: async (
    params: FeedbackParam
  ): Promise<FeedbackListResponse> => {
    const { data } = await apiClient.get("/feedbacks", { params });
    return {
      meta: data.meta,
      data: data.data,
    };
  },

  // 2. API Get /feedbacks/:id
  feedbackDetail: async (id: string): Promise<FeedbackDetailResponse> => {
    const response = await apiClient.get<FeedbackDetailResponse>(
      `/feedbacks/${id}`
    );
    return response.data;
  },
  // 3. API Patch /feedbacks/:id
  updateFeedback: async ({
    id,
    payload,
  }: {
    id: string;
    payload: FeedbackPayload;
  }) => {
    const response = await apiClient.patch(`/feedbacks/${id}`, payload);
    return response.data;
  },
  // 4. API Post /feedbacks
  createResponses: async (id: string, payload: FeedbackPayload) => {
    const formData = buildFormData(payload);
    const response = await apiClient.post(
      `/feedbacks/${id}/responses`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
};