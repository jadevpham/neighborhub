// /events/[id]/edit/page.tsx
import EventEditorPage from "../../components/EventEditorPage";

export default function EditEventPage({ params }: { params: { id: string } }) {
  return <EventEditorPage mode="edit" eventId={params.id} />;
}
