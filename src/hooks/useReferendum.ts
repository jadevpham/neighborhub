import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { referendumAPI } from "@/services/referendumAPI";
import type {
  ReferendumParam,
  ReferendumListResponse,
  ReferendumPayload,
  ReferendumDetailData,
  ReferendumDeletePayload,
} from "@/types/referendum";
import { toast } from "sonner";
// 1. Hook dùng cho API Get /referendums
export function useReferendumListQuery(params: ReferendumParam) {
  return useQuery<ReferendumListResponse>({
    queryKey: ["eventList", params],
    queryFn: () => referendumAPI.referentdumList(params),
    placeholderData: (prev) => prev,
  });
}

// 2. Hook dùng cho API Post /referendums
export const useCreateReferendumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReferendumPayload) =>
      referendumAPI.createReferendum(payload),

    onSuccess: () => {
      toast.success("Referendum created successfully");

      // Reload list referendum
      queryClient.invalidateQueries({
        queryKey: ["referendums"],
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create referendum";

      toast.error(message);
    },
  });
};
// 3. Hook dùng cho API Get /referendums/:referendumId
export const useReferendumDetailQuery = (referendumId?: string) => {
  return useQuery<ReferendumDetailData>({
    queryKey: ["referendums", "detail", referendumId],

    queryFn: () => {
      if (!referendumId) {
        throw new Error("Referendum ID is required");
      }
      return referendumAPI.referendumDetail(referendumId);
    },

    enabled: !!referendumId,

    staleTime: 1000 * 60 * 5, // 5 phút
  });
};

// 4. Hook cho API Patch /referendums/:referendumId/close
export const useCloseReferendumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referendumId: string) =>
      referendumAPI.closeReferendum(referendumId),

    onSuccess: () => {
      toast.success("Referendum closed successfully");

      // reload list + detail
      queryClient.invalidateQueries({
        queryKey: ["referendums"],
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to close referendum";

      toast.error(message);
    },
  });
};

// 5. Hook cho API Delete /referendums/:referendumId/delete
export const useDeleteReferendumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      referendumId,
      payload,
    }: {
      referendumId: string;
      payload: ReferendumDeletePayload;
    }) => referendumAPI.deleteReferendum(referendumId, payload),

    onSuccess: () => {
      toast.success("Referendum deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["referendums"],
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete referendum";

      toast.error(message);
    },
  });
};