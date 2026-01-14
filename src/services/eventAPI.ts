import apiClient from "@/lib/apiClient";
import { EventListResponse, EventParam, EventPayload, EventDetailResponse, EventTicketPayload } from "@/types/event";
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

  // 4. API Post /events/:id/ticket-types
  createEventTicket: async (id: string, payload: EventTicketPayload) => {
    const response = await apiClient.post(`/events/${id}/ticket-types`, payload);
    return response.data;
  },
};
