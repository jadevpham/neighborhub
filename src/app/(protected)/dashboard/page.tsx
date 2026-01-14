"use client";

import { useState } from "react";

// ----------------------
// MOCK DATA (DATA GIẢ)
// ----------------------

const mockData = {
  kpi: {
    residents: {
      total: 1234,
      newThisMonth: 45,
      pending: 12,
      rejected: 3,
      blocked: 10,
      byZone: [
        { zone_id: "zone_1", zone_name: "Zone A", count: 350 },
        { zone_id: "zone_2", zone_name: "Zone B", count: 280 }
      ]
    },

    news: {
      total: 210,
      draft: 12,
      published: 190,
      siteNews: 80,
      zoneNews: 110
    },

    events: {
      upcoming: 8,
      ongoing: 3,
      waitingApproval: 5,
      past: 120
    },

    facilities: {
      total: 25,
      active: 20,
      maintenance: 3,
      blocked: 2
    },

    bookings: {
      todayTotal: 120,
      todayBooked: 80,
      todayCancelled: 15,
      occupancyRate: 0.66,
      topFacilities: [
        { facility_id: "f1", facility_name: "Tennis Court", bookings: 30 },
        { facility_id: "f2", facility_name: "Swimming Pool", bookings: 25 }
      ],
      cancelReasons: [
        { reason: "Not Available", count: 5 },
        { reason: "Change of Plan", count: 4 }
      ]
    },

    feedback: {
      total: 522,
      new: 12,
      averageRating: 4.3,
      negative: 3,
      categoryBreakdown: [
        { category: "Facility", count: 200 },
        { category: "Security", count: 80 },
        { category: "Cleanliness", count: 150 }
      ]
    },

    apartments: {
      total: 750,
      vacant: 45,
      pendingApproval: 8,
      occupied: 697
    },

    referendum: {
      total: 5,
      active: 2,
      finished: 3,
      participationRate: 0.74,
      activeList: [
        {
          id: "ref1",
          title: "Upgrade Parking Area",
          votes: 320,
          totalEligible: 500,
          participationRate: 0.64
        }
      ]
    }
  },

  charts: {
    residentGrowth: [
      { month: "2025-01", count: 120 },
      { month: "2025-02", count: 150 },
      { month: "2025-03", count: 160 }
    ],

    eventByMonth: [
      { month: "2025-01", events: 10 },
      { month: "2025-02", events: 12 },
      { month: "2025-03", events: 15 }
    ],

    bookingTrends: [
      { date: "2025-03-01", booked: 30, cancelled: 2 },
      { date: "2025-03-02", booked: 28, cancelled: 5 }
    ],

    facilityUsage: [
      { facility_id: "f1", facility_name: "Pool", bookings: 120 },
      { facility_id: "f2", facility_name: "Tennis Court", bookings: 90 },
      { facility_id: "f3", facility_name: "BBQ Area", bookings: 60 }
    ],

    feedbackTrends: [
      { date: "2025-03-01", averageRating: 4.5 },
      { date: "2025-03-02", averageRating: 4.2 },
      { date: "2025-03-03", averageRating: 4.4 }
    ],

    referendumTrends: [
      {
        referendum_id: "ref1",
        title: "Upgrade Parking Area",
        date: "2025-03-05",
        participation: 0.68
      },
      {
        referendum_id: "ref2",
        title: "Install More Cameras",
        date: "2025-03-10",
        participation: 0.52
      }
    ]
  },

  recent: {
    residents: [
      {
        id: "r1",
        name: "Nguyen Van A",
        avatar: "",
        status_resident: 0,
        created_at: "2025-03-10T10:20:00"
      }
    ],

    news: [
      {
        id: "n1",
        title: "Lịch bảo trì hồ bơi",
        scope: "site",
        created_at: "2025-03-09T15:00:00"
      }
    ],

    events: [
      {
        id: "e1",
        title: "Tết Trung Thu",
        status: "upcoming",
        start_time: "2025-03-20T18:00:00"
      }
    ],

    bookings: [
      {
        id: "b1",
        facility_id: "f2",
        facility_name: "Tennis Court",
        action: "booked_by_resident",
        action_at: "2025-03-10T09:00:00"
      }
    ],

    feedback: [
      {
        id: "fb1",
        resident_name: "Tran B",
        rating: 2,
        comment: "Too noisy",
        created_at: "2025-03-10T08:30:00"
      }
    ],

    referendum: [
      {
        id: "ref1",
        title: "Nâng cấp thang máy",
        progress: 0.45,
        created_at: "2025-03-09T12:00:00"
      }
    ]
  }
};

// resident status map
const residentStatusMap: Record<
  number,
  { label: string; className: string }
> = {
  0: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
  1: { label: "Active", className: "bg-green-100 text-green-700" },
  2: { label: "Rejected", className: "bg-red-100 text-red-700" },
  3: { label: "Blocked", className: "bg-gray-200 text-gray-700" },
  4: { label: "Deleted", className: "bg-red-200 text-red-800" }
};

// ================================
// DASHBOARD PAGE (KHÔNG CALL API)
// ================================

export default function DashboardPage() {
  const data = mockData;
  const kpi = data.kpi;
  const charts = data.charts;
  const recent = data.recent;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Mock data — không gọi API
        </p>
      </div>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Residents"
          value={kpi.residents.total}
          subtitle={`+${kpi.residents.newThisMonth} this month`}
        />
        <KpiCard
          title="News published"
          value={kpi.news.published}
          subtitle={`${kpi.news.draft} draft`}
        />
        <KpiCard
          title="Upcoming events"
          value={kpi.events.upcoming}
          subtitle={`${kpi.events.ongoing} ongoing`}
        />
        <KpiCard
          title="Facilities"
          value={kpi.facilities.total}
          subtitle={`${kpi.facilities.maintenance} under maintenance`}
        />

        <KpiCard
          title="Bookings today"
          value={kpi.bookings.todayBooked}
          subtitle={`${Math.round(
            kpi.bookings.occupancyRate * 100
          )}% occupancy`}
        />
        <KpiCard
          title="Feedback"
          value={kpi.feedback.total}
          subtitle={`Avg rating ${kpi.feedback.averageRating.toFixed(1)}`}
        />
        <KpiCard
          title="Apartments"
          value={kpi.apartments.total}
          subtitle={`${kpi.apartments.vacant} vacant`}
        />
        <KpiCard
          title="Referendums"
          value={kpi.referendum.active}
          subtitle={`Participation ${Math.round(
            kpi.referendum.participationRate * 100
          )}%`}
        />
      </section>

      {/* CHART PLACEHOLDERS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CardSection title="Resident growth">
          <PlaceholderChart label="ResidentGrowthChart" />
        </CardSection>

        <CardSection title="Events per month">
          <PlaceholderChart label="EventByMonthChart" />
        </CardSection>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <CardSection title="Booking trends">
          <PlaceholderChart label="BookingTrendsChart" />
        </CardSection>

        <CardSection title="Facility usage">
          <PlaceholderChart label="FacilityUsageChart" />
        </CardSection>

        <CardSection title="Feedback trends">
          <PlaceholderChart label="FeedbackTrendsChart" />
        </CardSection>
      </section>

      {/* RECENT LISTS */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* RECENT RESIDENTS */}
        <RecentResidents recent={recent.residents} />

        {/* RECENT NEWS */}
        <RecentNews recent={recent.news} />

        {/* RECENT EVENTS & ACTIONS */}
        <div className="space-y-4">
          <RecentEvents recent={recent.events} />
          <QuickActions />
        </div>
      </section>
    </div>
  );
}

// ===============================
// COMPONENTS
// ===============================

function KpiCard({ title, value, subtitle }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function CardSection({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 h-80">
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      {children}
    </div>
  );
}

function PlaceholderChart({ label }: any) {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-xs text-gray-400">
      {label} — (Mock)
    </div>
  );
}

function RecentResidents({ recent }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <h3 className="font-semibold mb-3 text-sm">New residents</h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recent.map((r: any) => {
          const status = residentStatusMap[r.status_resident];

          return (
            <div key={r.id} className="flex items-center gap-3 text-sm">
              <img
                src={
                  r.avatar ||
                  "https://ui-avatars.com/api/?name=R&background=E5E7EB"
                }
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{r.name}</p>
                <p className="text-[11px] text-gray-500">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status.className}`}
              >
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentNews({ recent }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <h3 className="font-semibold mb-3 text-sm">Latest news</h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recent.map((n: any) => (
          <div key={n.id} className="text-sm">
            <p className="font-medium">{n.title}</p>
            <div className="flex justify-between text-[11px] text-gray-500">
              <span className="uppercase">Scope: {n.scope}</span>
              <span>{new Date(n.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentEvents({ recent }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <h3 className="font-semibold mb-3 text-sm">Upcoming events</h3>

      <div className="space-y-4 max-h-56 overflow-y-auto">
        {recent.map((e: any) => (
          <div key={e.id} className="text-sm">
            <p className="font-medium">{e.title}</p>
            <div className="flex justify-between text-[11px] text-gray-500">
              <span className="capitalize">{e.status}</span>
              <span>{new Date(e.start_time).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4">
      <h3 className="font-semibold text-sm mb-3">Quick actions</h3>
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1.5 rounded-xl bg-emerald-600 text-xs font-medium text-white">
          + Create news
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-xs font-medium text-white">
          + Create event
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-purple-600 text-xs font-medium text-white">
          + Add facility
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-orange-600 text-xs font-medium text-white">
          + Open referendum
        </button>
      </div>
    </div>
  );
}
