"use client";

import {
  useDashboardKpis,
  useDashboardRecent,
  useDashboardResidents,
  useDashboardEvents,
  useDashboardBookings,
  useDashboardFeedbacks,
  useDashboardReferendums
} from "@/hooks/useDashboard";

import RecentEvents from "./components/RecentEvents";
import RecentNews from "./components/RecentNews";
import RecentResidents from "./components/RecentResidents";
import KpiCard from "./components/KpiCard";
import CardSection from "./components/CardSection";
import QuickActions from "./components/QuickActions";
import ResidentGrowthChart from "./components/ResidentGrowthChart";
import EventByMonthChart from "./components/EventByMonthChart";
import BookingTrendsChart from "./components/BookingTrendsChart";
import FacilityUsageChart from "./components/FacilityUsageChart";
import FeedbackTrendsChart from "./components/FeedbackTrendsChart";
import ReferendumProgressList from "./components/ReferendumProgressList";
import ReferendumTrendsChart from "./components/ReferendumTrendsChart";

export default function DashboardPage() {
  const { data: kipsData, isLoading: loadingKips } = useDashboardKpis();
  const { data: recent, isLoading: loadingRecent } = useDashboardRecent();
  const { data: residentsData } = useDashboardResidents();
  const { data: eventsData } = useDashboardEvents();
  const { data: bookingsData } = useDashboardBookings();
  const { data: feedbacksData } = useDashboardFeedbacks();
  const { data: referendumsData } = useDashboardReferendums();

  const kips = kipsData?.data;
  const residents = residentsData?.data;
  const events = eventsData?.data;
  const bookings = bookingsData?.data;
  const feedbacks = feedbacksData?.data;
  const referendums = referendumsData?.data;


  if (loadingKips || loadingRecent) {
    return <div className="p-6 text-sm text-gray-500">Loading dashboard...</div>;
  }

  if (!kips || !recent) {
    return <div className="p-6 text-sm text-red-500">Failed to load dashboard</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Residents"
          value={kips.residents.total}
          subtitle={`+${kips.residents.new_this_month} this month`}
        />

        <KpiCard
          title="News published"
          value={kips.news[1]}          // published
          subtitle={`${kips.news[0]} draft`}
        />

        <KpiCard
          title="Pending events"
          value={kips.events[1]}        // pending
          subtitle={`${kips.events[0]} draft`}
        />

        <KpiCard
          title="Facilities"
          value={kips.facilities.total}
          subtitle={`${kips.facilities[0]} under maintenance`}
        />

        <KpiCard
          title="Bookings today"
          value={kips.bookings.today_booked}
          subtitle={`${Math.round(
            kips.bookings.occupancy_rate * 100
          )}% occupancy`}
        />

        <KpiCard
          title="Feedback"
          value={kips.feedbacks.total}
          subtitle={`Avg rating ${kips.feedbacks.average_rating.toFixed(1)}`}
        />

        <KpiCard
          title="Referendums"
          value={kips.referendums.active}
          subtitle={`Participation ${Math.round(
            kips.referendums.participation_rate * 100
          )}%`}
        />
      </section>


      {/* CHART PLACEHOLDERS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CardSection title="Resident growth">
          <ResidentGrowthChart data={residents?.growth ?? []} />
        </CardSection>

        <CardSection title="Events per month">
          <EventByMonthChart data={events?.by_month ?? []} />
        </CardSection>

        <CardSection title="Booking trends">
          <BookingTrendsChart data={bookings?.trends ?? []} />
        </CardSection>

        <CardSection title="Facility usage">
          <FacilityUsageChart data={bookings?.top_facilities ?? []} />
        </CardSection>

        <CardSection title="Feedback trends">
          <FeedbackTrendsChart data={feedbacks?.trends ?? []} />
        </CardSection>

        <CardSection title="Referendum participation trends">
          <ReferendumTrendsChart data={referendums?.trends ?? []} />
        </CardSection>

        <CardSection title="Active referendums">
          <ReferendumProgressList data={referendums?.trends ?? []} />
        </CardSection>

      </section>

      {/* RECENT LISTS */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <RecentResidents recent={recent.residents} />
        <RecentNews recent={recent.news} />

        <div className="space-y-4">
          <RecentEvents recent={recent.events} />
          <QuickActions />
        </div>
      </section>
    </div>
  );
}
