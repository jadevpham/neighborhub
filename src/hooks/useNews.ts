import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  NewsDetailResponse,
  NewsListResponse,
  NewsParam,
  NewsPayload,
} from "@/types/news";
import { newsAPI } from "@/services/newsAPI";
import { toast } from "sonner";
// 1. Hook dùng cho API Get /news
export function useNewsListQuery(params: NewsParam) {
  return useQuery<NewsListResponse>({
    queryKey: ["newsList", params],
    queryFn: () => newsAPI.newsList(params),
    placeholderData: (prev) => prev,
  });
}

// 2. Hook dùng cho API Get /news/:id
export const useNewsDetailQuery = (id: string) => {
  return useQuery<NewsDetailResponse>({
    queryKey: ["resident", id],
    queryFn: () => newsAPI.newsDetail(id),
    enabled: !!id,
  });
};

// 3. Hook dùng cho API Post /news
export function useCreateNewsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewsPayload) => newsAPI.createNews(payload),

    onSuccess: () => {
      toast.success("News created successfully!");

      // refetch list news nếu có page list đang mở
      queryClient.invalidateQueries({ queryKey: ["create-news"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create news");
    },
  });
}

// 4. Hook dùng cho API Patch /news/:id
export const useUpdateNewsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NewsPayload }) =>
      newsAPI.updateNews(id, payload),

    onSuccess: () => {
      // Tự động refetch danh sách + chi tiết news
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news-detail"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to upadte news");
    },
  });
};

// 5. Hook dùng cho API Delete /news/:id
// Không có useNewsMutationDelete vì đã có hook useDeleteResource
