import {
  EventDetailResponse,
  EventParam,
  EventListResponse,
  EventPayload,
  EventTicketPayload,
  EventTicketParam,
  EventTicketResponse,
} from "@/types/event";
import { eventAPI } from "@/services/eventAPI";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { UseQueryOptions } from "@tanstack/react-query";

// 1. Hook dùng cho API Get /events
export function useEventListQuery(params: EventParam) {
  return useQuery<EventListResponse>({
    queryKey: ["eventList", params],
    queryFn: () => eventAPI.eventList(params),
    placeholderData: (prev) => prev,
  });
}

// 2. Hook dùng cho API Get /events/:id
// export const useEventDetailQuery = (id: string, options?: Omit<
//   UseQueryOptions<EventDetailResponse, Error>,
//   "queryKey" | "queryFn"
// >) => {
//   return useQuery<EventDetailResponse>({
//     queryKey: ["eventDetail", id],
//     queryFn: () => eventAPI.eventDetail(id),
//     enabled: !!id,
//     ...options,
//   });
// };

export const useEventDetailQuery = (
  eventId?: string,
  options?: any
) => {
  return useQuery({
    queryKey: ["event-detail", eventId],
    queryFn: () => {
      if (!eventId) {
        // ⛔ CỰC KỲ QUAN TRỌNG
        return Promise.reject("No eventId");
      }
      return eventAPI.eventDetail(eventId);
    },
    enabled: !!eventId && options?.enabled !== false,
    retry: false,          // ⛔ tránh retry sai
    refetchOnWindowFocus: false,
  });
};


// 3. Hook dùng cho API Post /events
export const useCreateEvent = (): UseMutationResult<
EventDetailResponse, // response type của API
  unknown, // error type
  EventPayload // input payload type
> => {
  return useMutation({
    mutationFn: (payload: EventPayload) => eventAPI.createEvents(payload),
  });
};

// 4. Hook dùng cho API Post /events/:id/ticket-types
export const useCreateEventTicket = (): UseMutationResult<
  EventTicketResponse, // response type của API
  AxiosError<any>, // error type
  EventTicketParam // input payload type
> => {
  return useMutation({
    mutationFn: ({ id, data }: EventTicketParam) =>
      eventAPI.createEventTicket(id, data),
    onSuccess: () => {
      toast.success("Event ticket created successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to create event ticket"
      );
    },
  });
};
