// src/app/(protected)/events/[id]/EventDetailClient.tsx
"use client";

import EventEditorPage from "../components/EventEditorPage";

export default function EventDetailClient({
  eventId,
}: {
  eventId: string;
}) {
  if (!eventId) return null;
  console.log("EVENT EDITOR PAGE IS CLIENT");

  return <EventEditorPage mode="detail" eventId={eventId} />;
}