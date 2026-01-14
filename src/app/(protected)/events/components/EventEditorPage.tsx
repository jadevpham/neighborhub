"use client";

import { useEffect, useState } from "react";
import { CreateEventStep, EventDetailResponse } from "@/types/event";
import PageHeader from "@/components/PageHeader";
import EventCreateSidebar from "../components/EventCreateSidebar";
import EventCreateForm from "../components/EventCreateForm";
import EventTicketCreateForm from "../components/EventTicketCreateForm";
import { EventEditorPageProps } from "@/types/event";
import { useEventDetailQuery } from "@/hooks/useEvent";
export default function EventEditorPage({ mode, eventId }: EventEditorPageProps) {
  const [currentEventId, setCurrentEventId] = useState<string | undefined>(
    eventId
  );
  const [step, setStep] = useState<CreateEventStep>(CreateEventStep.BUILD);
  const [event, setEvent] = useState<EventDetailResponse | null>(null);
  const { data, isLoading, isError } = useEventDetailQuery(currentEventId!, {
    // enabled: mode !== "create" && !!eventId,
    enabled: !!currentEventId,
  });

  
  console.log("event detail: ", data)
  
  // Load event khi detail / edit
//   useEffect(() => {
//     if (mode !== "create" && eventId) {
//       // call API detail
//       // setEvent(response)
//     }
//   }, [mode, eventId]);

useEffect(() => {
    if (data) {
      setEvent(data);
      // if (step === CreateEventStep.BUILD) {
      //   setStep(CreateEventStep.TICKET);
      // }
    }
  }, [data]);
  
  // if (mode !== "create" && isLoading) {
  //   return <div>Loading event...</div>;
  // }
  
  // if (isError) {
  //   return <div>Failed to load event</div>;
  // }

  if (currentEventId && isLoading) {
    return <div>Loading event...</div>;
  }

  if (currentEventId && isError && !event) {
    return <div>Failed to load event</div>;
  }
  

  
  return (
    <>
      <PageHeader
        title={
          mode === "create"
            ? "Create New Event"
            : mode === "edit"
            ? "Edit Event"
            : "Event Details"
        }
        showBack
      />

      <div className="flex gap-8">
        <EventCreateSidebar
          currentStep={step}
          onStepChange={setStep}
          event={event}
        //   readonly={mode === "detail"}
        />

        <main className="flex-1">
          {step === CreateEventStep.BUILD && (
            <EventCreateForm
              event={event}
              readonly={mode === "detail"}
              onSuccess={(ev) => {
                setEvent(ev);
                setCurrentEventId(ev.event_id);
                setStep(CreateEventStep.TICKET);
              }}
            />
          )}

          {step === CreateEventStep.TICKET && event && (
            <EventTicketCreateForm
              eventId={event.event_id}
            //   readonly={mode === "detail"}
            />
          )}

          {step === CreateEventStep.PUBLISH && (
            <div className="rounded-xl border bg-white p-6">
              Publish step
            </div>
          )}
        </main>
      </div>
    </>
  );
}
