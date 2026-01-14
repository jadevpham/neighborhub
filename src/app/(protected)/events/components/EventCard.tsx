import Link from "next/link";
import { EventData, EventStatus } from "@/types/event";
import { eventStatusMap } from "@/components/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import { CalendarRange, Building2, MapPin } from "lucide-react";

export default function EventCard({ event }: { event: EventData }) {
  const status = event.status as EventStatus;
  const st = eventStatusMap[status];
  if (!st) {
    console.warn("Unknown event status:", event.status);
  }
  return (
    <Link
      href={`/events/${event.event_id}`}
      className={`
        group bg-white rounded-2xl border ${st.border}
        hover:shadow-xl hover:-translate-y-1 ${st.hover}
        transition-all overflow-hidden
      `}
    >
      {/* Cover image */}
      <div className="h-40 bg-gray-100 relative">
        {event.cover_image_url ? (
          <img
            src={event.cover_image_url}
            alt={event.event_title ?? "Event"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No cover image
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full font-medium ${st.badge}`}
        >
          {st.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {event.event_title || "Untitled event"}
        </h3>
        {/* Hashtags */}
        {event.hash_tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.hash_tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full ${st.badge}`}
              >
                #{tag}
              </span>
            ))}
            {event.hash_tags.length > 4 && (
              <span className="text-xs text-gray-400">
                +{event.hash_tags.length - 4}
              </span>
            )}
          </div>
        )}
        {/* Location */}
        <div className="flex flex-col gap-1 text-xs text-gray-700">
          {event.location.siteName && (
            <div className="inline-flex items-start gap-2">
              <Building2 className={`w-4 h-4 mt-0.5 shrink-0 ${st.badge}`} />
              <span className="font-semibold">{event.location.siteName}</span>
            </div>
          )}

          {event.location.zoneName && (
            <div className="inline-flex items-start gap-2 text-gray-600">
              <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${st.badge}`} />
              <span className="font-semibold">{event.location.zoneName}</span>
            </div>
          )}
        </div>

        {/* Time */}
        <div className="inline-flex items-start gap-2 rounded-xl text-xs text-gray-700">
          <CalendarRange className={`w-4 h-4 mt-1 shrink-0 ${st.badge}`} />

          <div className="space-y-1">
            <div>
              <span className="font-semibold">Start Date:</span>{" "}
              {formatDate(event.overall_start_date)}
            </div>
            <div>
              <span className="font-semibold">End Date:</span>{" "}
              {formatDate(event.overall_end_date)}
            </div>
          </div>
        </div>
        {/* Meta */}
        <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t">
          <span>By {event.created_by || "System"}</span>
          <span>{event.updated_at ? formatDate(event.updated_at) : ""}</span>
        </div>
      </div>
    </Link>
  );
}
