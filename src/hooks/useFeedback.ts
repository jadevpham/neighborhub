import { feedbackAPI } from "@/services/feedbackAPI";
import {
  FeedbackDetailResponse,
  FeedbackListResponse,
  FeedbackParam,
  FeedbackPayload,
} from "@/types/feedback";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// 1. Hook dùng cho API Get /feedbacks
export function useFeedbackListQuery(params: FeedbackParam) {
  return useQuery<FeedbackListResponse>({
    queryKey: ["feedbackList", params],
    queryFn: () => feedbackAPI.feedbackList(params),
    placeholderData: (prev) => prev,
  });
}

// 2. Hook dùng cho API Get /feedbacks/:id
export const useFeedbackDetailQuery = (id: string) => {
  return useQuery<FeedbackDetailResponse>({
    queryKey: ["feedbackDetail", id],
    queryFn: () => feedbackAPI.feedbackDetail(id),
    enabled: !!id,
  });
};
export function useUpdateFeedbackMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FeedbackPayload }) =>
      feedbackAPI.updateFeedback({ id, payload }),    

    onSuccess: () => {
      toast.success("Feedback update successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedbackDetail"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update feedback");
    },
  });
}

export function useCreateResponsesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FeedbackPayload }) =>
      feedbackAPI.createResponses(id, payload),

    onSuccess: () => {
      toast.success("Responses created successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedbackDetail"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create responses");
    },
  });
}