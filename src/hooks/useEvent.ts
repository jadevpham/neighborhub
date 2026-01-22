import {
  EventDetailResponse,
  EventParam,
  EventListResponse,
  EventPayload,
  EventTicketPayload,
  EventTicketParam,
  EventTicketResponse,
  EventCancelRequestPayload,
  EventRejectPayload,
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
export const useEventDetailQuery = (eventId?: string, options?: any) => {
  return useQuery({
    queryKey: ["event-detail", eventId],
    queryFn: () => {
      if (!eventId) {

        return Promise.reject("No eventId");
      }
      return eventAPI.eventDetail(eventId);
    },
    enabled: !!eventId && options?.enabled !== false,
    retry: false,
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

// 4. Hook dùng cho API Patch /events/:id

// 5. Hook dùng cho API Post /events/:id/ticket-types
export const useCreateEventTicket = (): UseMutationResult<
  EventTicketResponse, // response type của API
  AxiosError<any>, // error type
  EventTicketParam // input payload type
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: EventTicketParam) =>
      eventAPI.createEventTicket(id, data),
    onSuccess: (res, variables) => {
      const newTicket =
        res?.data ?? res; // tuỳ BE trả về

      queryClient.setQueryData(
        ["event-ticket-types", variables.id],
        (old: any[] = []) => [...old, newTicket]
      );

      toast.success("Event ticket created successfully!");
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to create event ticket"
      );
    },
  });
};

// 6. Hook dùng cho API Patch /events/:id/ticket-types/ticketTypeId
export function useUpdateEventTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: string;
      ticketTypeId: string;
      payload: EventTicketPayload;
    }) => eventAPI.updateEventTicket(params),

    onSuccess: () => {
      toast.success("Ticket updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to updated ticket");
    },
  });
}
// 7. Hook dùng cho API Delete /events/:id/ticket-types/ticketTypeId
export function useDeleteEventTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: string;
      ticketTypeId: string;
    }) => eventAPI.deleteEventTicket(params),

    onSuccess: (_, variables) => {
      toast.success("Ticket deleted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["event-detail", variables.id],
      });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to delete ticket"
      );
    },
  });
}


// 8. Hook dùng cho API Patch /events/:id/visibility
export const useToggleEventVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventAPI.visibilityEvent(id),

    onSuccess: () => {
      toast.success("Pusblish event success");

      // Refetch list + detail nếu có
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Pusblish event fail"
      );
    },
  });
};

// 9. Hook dùng cho API Delete event/:id
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventAPI.deleteEvent(id),

    onSuccess: () => {
      toast.success("Deleted Event");

      queryClient.invalidateQueries({ queryKey: ["events"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Delete Event Fail"
      );
    },
  });
};

// 10. Hook dùng cho API Post /event/:id/cancel-request
/**
 * Request cancel event (Active -> PendingCancellation)
 */
export const useCancelRequestEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: EventCancelRequestPayload;
    }) => eventAPI.cancelRequestEvent(id, payload),

    onSuccess: () => {
      toast.success("Event cancellation request has been submitted.");

      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "The event cancellation request failed."
      );
    },
  });
};
// 11. Hook dùng cho API Post /event/:id/finalize-cancellaion
/**
 * Finalize cancellation (PendingCancellation -> Cancelled)
 */
export const useFinalizeCancellationEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventAPI.finalizeCancellationEvent(id),

    onSuccess: () => {
      toast.success("The event has been successfully canceled.");

      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "Cancel the failed event"
      );
    },
  });
};

// 12. Hook dùng cho API Patch /event/:id/approve  
/**
 * Approve event
 * Pending -> Active
 */
export const useApproveEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventAPI.approveEvent(id),

    onSuccess: () => {
      toast.success("Event approved successfully");

      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Approve event failed"
      );
    },
  });
};
// 13. Hook dùng cho API Pach /event/:id/reject
/**
 * Reject event
 * Pending -> Rejected
 */
export const useRejectEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: EventRejectPayload;
    }) => eventAPI.rejectEvent(id, payload),

    onSuccess: () => {
      toast.success("Event rejected");

      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Reject event failed"
      );
    },
  });
};

