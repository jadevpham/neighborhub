import apiClient from "@/lib/apiClient";
import { EventListResponse, EventParam, EventPayload, EventDetailResponse, EventTicketPayload, EventCancelRequestPayload, EventRejectPayload } from "@/types/event";
import { buildEventFormData } from "@/utils/buildEventFormData";
export const eventAPI = {
  // 1. API Get /events
  eventList: async (params: EventParam): Promise<EventListResponse> => {
    const { data } = await apiClient.get("/events", { params });
    return {
      meta: data.meta,
      data: data.data,
    };
  },

  // 2. API Get /events/:id
  eventDetail: async (id: string): Promise<EventDetailResponse> => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  },

  // 3. API Post /events
  createEvents: async (payload: EventPayload) => {
    const formData = buildEventFormData(payload);
    const response = await apiClient.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 4. API Patch /events/:id

  // 5. API Post /events/:id/ticket-types
  createEventTicket: async (id: string, payload: EventTicketPayload) => {
    const response = await apiClient.post(`/events/${id}/ticket-types`, payload);
    return response.data;
  },

  // 6. API Patch /events/:id/ticket-types/ticketTypeId
  updateEventTicket: async ({
    id,
    ticketTypeId,
    payload,
  }: {
    id: string;
    ticketTypeId: string;
    payload: EventTicketPayload;
  }) => {
    const response = await apiClient.patch(`/events/${id}/ticket-types/${ticketTypeId}`, payload);
    return response.data;
  },

  // 7. API Delete /events/:id/ticket-types/ticketTypeId
  deleteEventTicket: async ({
    id,
    ticketTypeId,
  }: {
    id: string;
    ticketTypeId: string;
  }) => {
    const res = await apiClient.delete(
      `/events/${id}/ticket-types/${ticketTypeId}`
    );
    return res.data;
  },
  
  // 8. API Patch /events/:id/visibility
  visibilityEvent: async (id: string) => {
    const response = await apiClient.patch(
      `/events/${id}/visibility`
    );
    return response.data;
  },

  // 9. API Delete /event/:id
  deleteEvent: async (id: string) => {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
},

// 10. API Post /event/:id/cancel-request
cancelRequestEvent: async (id: string, payload: EventCancelRequestPayload) => {
  const response = await apiClient.post(`/events/${id}/cancel-request`, payload);
  return response.data;
},

// 11. API Post /event/:id/finalize-cancellaion
finalizeCancellationEvent: async (id: string) => {
  const response = await apiClient.post(`/events/${id}/finalize-cancellaion`);
  return response.data;
},

// 12. API Patch /event/:id/approve  
approveEvent: async (id: string) => {
    const response = await apiClient.patch(
      `/events/${id}/approve`
    );
    return response.data;
  },
// 13. API Patch /event/:id/reject
rejectEvent: async (id: string, payload: EventRejectPayload) => {
  const response = await apiClient.patch(`/events/${id}/reject`, payload);
  return response.data;
},

};
