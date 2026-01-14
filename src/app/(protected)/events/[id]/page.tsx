// src/app/(protected)/events/[id]/page.tsx
import EventDetailClient from "./EventDetailClient";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EventDetailClient eventId={id} />;
}
