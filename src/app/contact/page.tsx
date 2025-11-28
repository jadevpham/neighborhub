"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRightCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 text-gray-900">
      {/* HERO SECTION */}
      <section className="relative w-full pt-24 pb-32 overflow-hidden">
        {/* BG ILLUSION */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.15),_transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Let’s Build Better, Connected Communities with
            <span className="text-emerald-600"> NeighborHub</span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A hyperlocal community platform designed to reduce social isolation
            and bring apartment residents closer — through verified
            interactions, shared activities, events, and seamless facility
            access.
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=neighborhubsystem@gmail.com&su=Inquiry%20About%20NeighborHub%20Platform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-300/30"
          >
            Contact us now
            <ArrowRightCircle size={22} />
          </a>
        </div>

        {/* DECOR FLOATING IMAGES */}
        <img
          src="https://images.unsplash.com/photo-1527030280862-64139fba04ca?q=80&w=2400&auto=format&fit=crop"
          className="absolute -left-10 top-48 w-72 h-48 object-cover rounded-3xl shadow-2xl opacity-70 rotate-[-6deg]"
        />
        <img
          src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2400&auto=format&fit=crop"
          className="absolute -right-10 top-64 w-80 h-56 object-cover rounded-3xl shadow-2xl opacity-70 rotate-[5deg]"
        />
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Why <span className="text-emerald-600">NeighborHub</span> Exists
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Verified, Safe Community",
                desc: "Strict verification ensures only real residents can join — reducing scams, spam, and fake accounts.",
              },
              {
                title: "True Community Interaction",
                desc: "Group chats, clubs, events, hobbies, sharing — everything missing from typical building apps.",
              },
              {
                title: "Better Living Experience",
                desc: "Encouraging neighbors to connect, socialize, share support, and build meaningful relationships.",
              },
              {
                title: "Empowered Management Board",
                desc: "Tools for announcements, approvals, bookings, referendums, dashboards, and safety information.",
              },
              {
                title: "Seamless Facility Booking",
                desc: "Book BBQ areas, pools, meeting rooms, sports courts, etc., with automated rules & scheduling.",
              },
              {
                title: "Partner Ecosystem",
                desc: "External organizers can host workshops, classes, community events — under approval control.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl bg-gray-50 border border-gray-200 shadow-md hover:shadow-xl hover:border-emerald-300 hover:scale-[1.02] transition-all"
              >
                <CheckCircle2 className="text-emerald-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNCTION SECTION */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-14">
            Powerful Functionality for Every Role
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                role: "Guest",
                features: [
                  "View introduction & platform benefits",
                  "Register resident account",
                ],
              },
              {
                role: "Resident",
                features: [
                  "Join social feed & activities",
                  "Messaging & group chats",
                  "Create/join clubs & events",
                  "Facility booking",
                  "Lost & found",
                  "Submit feedback (anonymous allowed)",
                  "Referendums & voting",
                  "Emergency contacts",
                ],
              },
              {
                role: "Management Board",
                features: [
                  "Dashboard & analytics",
                  "Approve events, clubs, bookings",
                  "Approve residents & partners",
                  "Post announcements",
                  "Manage shared facilities",
                  "Create referendums",
                  "Monitor apartments",
                  "Safety & emergency info",
                ],
              },
              {
                role: "Partner",
                features: [
                  "Request events",
                  "Manage attendees",
                  "Event check-in/out",
                ],
              },
              {
                role: "Urban Area Admin",
                features: [
                  "Manage multiple buildings",
                  "Create Management Board accounts",
                ],
              },
              {
                role: "System Admin",
                features: [
                  "Create Partner accounts",
                  "Create Urban Admin accounts",
                  "Manage entire system",
                ],
              },
            ].map((roleData, index) => (
              <div
                key={index}
                className="p-7 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
                  {roleData.role}
                </h3>
                <ul className="list-disc ml-5 mt-2 text-gray-700 text-sm space-y-2">
                  {roleData.features.map((f, i2) => (
                    <li key={i2}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTACT INFO */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Get in Touch with Us</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Ready to bring a better living experience to your apartment
              community? Contact our team for a full demo or partnership
              opportunity.
            </p>

            <div className="space-y-5">
              <p className="flex items-center gap-3">
                <Mail className="text-emerald-600" size={22} />
                <span>neighborhubsystem@gmail.com</span>
              </p>

              <p className="flex items-center gap-3">
                <Phone className="text-emerald-600" size={22} />
                <span>0393 146 856</span>
              </p>

              <p className="flex items-start gap-3">
                <MapPin className="text-emerald-600 mt-1" size={24} />
                <span>
                  High-tech Park, Thu Duc City, Ho Chi Minh City, Vietnam
                </span>
              </p>
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ngocbichpham2110@gmail.com&su=Inquiry%20About%20NeighborHub"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-300/30"
            >
              Send Email
              <ArrowRightCircle size={24} />
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl z-10" />
            <img
              src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2400&auto=format&fit=crop"
              className="w-full h-[480px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
          <Link
            href="/"
            className="
    fixed top-6 left-6 z-50
    inline-flex items-center gap-2
    px-5 py-2 rounded-full
    text-sm font-medium text-gray-800

    border border-white/30
    bg-white/10 backdrop-blur-xl

    shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    hover:shadow-[0_6px_30px_rgba(0,0,0,0.15)]
    transition-all duration-300

    hover:bg-white/20 hover:border-white/40
  "
          >
            <ArrowLeft size={18} className="text-gray-800" />
          </Link>
        </div>
      </section>
    </main>
  );
}
