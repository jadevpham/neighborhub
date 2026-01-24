
import { RecentResponse, BookingsResponse, EventsResponse, FeedbacksResponse, KpisResponse, ReferendumsResponse, ResidentsResponse } from "@/types/dashboard";
import apiClient from "@/lib/apiClient";
export const dashboardAPI = {

    // 1. /kpis
    getKpis: async (): Promise<KpisResponse> => {
        const { data } = await apiClient.get("/dashboard/kpis");
        return {
            data: data.data,
        };
    },

    // 2. /residents
    getResidents: async (): Promise<ResidentsResponse> => {
        const { data } = await apiClient.get("/dashboard/residents");
        return {
            data: data.data,
        };
    },

    // 3. feedbacks
    getFeedbacks: async (): Promise<FeedbacksResponse> => {
        const { data } = await apiClient.get("/dashboard/feedbacks");
        return {
            data: data.data,
        };
    },

    // 4. /bookings
    getBookings: async (): Promise<BookingsResponse> => {
        const { data } = await apiClient.get("/dashboard/bookings");
        return {
            data: data.data,
        };
    },

    // 5. referendums
    getReferendums: async (): Promise<ReferendumsResponse> => {
        const { data } = await apiClient.get("/dashboard/referendums");
        return {
            data: data.data,
        };
    },

    // 6. events
    getEvents: async (): Promise<EventsResponse> => {
        const { data } = await apiClient.get("/dashboard/events");
        return {
            data: data.data,
        };
    },

    // 7. recent
    getRecent: async (): Promise<RecentResponse> => {
        const { data } = await apiClient.get("/dashboard/recent");
        return data;
    },
}