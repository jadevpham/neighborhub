import { useQuery } from "@tanstack/react-query";
import { RecentResponse, BookingsResponse, EventsResponse, FeedbacksResponse, KpisResponse, ReferendumsResponse, ResidentsResponse } from "@/types/dashboard";
import { dashboardAPI } from "@/services/dashboard";

export function useDashboardKpis() {
    return useQuery<KpisResponse>({
        queryKey: ["dashboard_kpis"],
        queryFn: () => dashboardAPI.getKpis(),
        placeholderData: (prev) => prev,
    });
}

export function useDashboardResidents() {
    return useQuery<ResidentsResponse>({
        queryKey: ["dashboard_residents"],
        queryFn: () => dashboardAPI.getResidents(),
        placeholderData: (prev) => prev,
    });
}

export function useDashboardFeedbacks() {
    return useQuery<FeedbacksResponse>({
        queryKey: ["dashboard_feedbacks"],
        queryFn: () => dashboardAPI.getFeedbacks(),
        placeholderData: (prev) => prev,
    });
}

export function useDashboardBookings() {
    return useQuery<BookingsResponse>({
        queryKey: ["dashboard_bookings"],
        queryFn: () => dashboardAPI.getBookings(),
        placeholderData: (prev) => prev,
    });
}

export function useDashboardReferendums() {
    return useQuery<ReferendumsResponse>({
        queryKey: ["dashboard_referendums"],
        queryFn: () => dashboardAPI.getReferendums(),
        placeholderData: (prev) => prev,
    });
}

export function useDashboardEvents() {
    return useQuery<EventsResponse>({
        queryKey: ["dashboard_events"],
        queryFn: () => dashboardAPI.getEvents(),
        placeholderData: (prev) => prev,
    });
}

export function useDashboardRecent() {
    return useQuery<RecentResponse>({
        queryKey: ["dashboard_recent"],
        queryFn: () => dashboardAPI.getRecent(),
        placeholderData: (prev) => prev,
    });
}