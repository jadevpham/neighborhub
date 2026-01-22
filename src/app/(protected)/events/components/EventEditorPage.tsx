"use client";

import { useEffect, useState } from "react";
import { CreateEventStep, EventDetailResponse, EventStatus } from "@/types/event";
import PageHeader from "@/components/PageHeader";
import EventCreateSidebar from "../components/EventCreateSidebar";
import EventCreateForm from "../components/EventCreateForm";
import EventTicketCreateForm from "../components/EventTicketCreateForm";
import { EventEditorPageProps } from "@/types/event";
import { useApproveEvent, useCancelRequestEvent, useDeleteEvent, useEventDetailQuery, useFinalizeCancellationEvent, useRejectEvent, useToggleEventVisibility } from "@/hooks/useEvent";
import EventTicketStep from "./EventTicketStep";
import { Button } from "@nextui-org/react";
import { EventActionConfig } from "@/components/StatusBadge";

export default function EventEditorPage({ mode, eventId }: EventEditorPageProps) {
  const [currentEventId, setCurrentEventId] = useState<string | undefined>(
    eventId
  );
  const [step, setStep] = useState<CreateEventStep>(CreateEventStep.BUILD);
  const [event, setEvent] = useState<EventDetailResponse | null>(null);
  const { data, isLoading, isError, refetch } = useEventDetailQuery(currentEventId!, {
    // enabled: mode !== "create" && !!eventId,
    enabled: !!currentEventId,
  });
  // const { mutate: toggleVisibility, isPending } =
  // useToggleEventVisibility();

  // const { mutate: deleteEventMutate, isPending: isDeleting } =
  // useDeleteEvent();

const handleDeleteEvent = (id: string) => {
  // if (!confirm("Bạn chắc chắn muốn xóa sự kiện này?")) return;
  deleteEvent(id);
};
// Publish
const {
  mutate: toggleVisibility,
  isPending: isPublishing,
} = useToggleEventVisibility();

// Delete
const {
  mutate: deleteEvent,
  isPending: isDeleting,
} = useDeleteEvent();

// Cancel request
const {
  mutate: cancelRequestEvent,
  isPending: isCancelRequesting,
} = useCancelRequestEvent();

// Finalize cancel
const {
  mutate: finalizeCancel,
  isPending: isFinalizing,
} = useFinalizeCancellationEvent();

// Approve
const {
  mutate: approveEvent,
  isPending: isApproving,
} = useApproveEvent();

// Reject
const {
  mutate: rejectEvent,
  isPending: isRejecting,
} = useRejectEvent();

// Cancel reason (textarea / modal)
const [cancelReason, setCancelReason] = useState<string>("");
            
  console.log("event detail: ", data)
  
useEffect(() => {
    if (data) {
      setEvent(data);
    }
  }, [data]);

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
            // <EventTicketCreateForm
            //   eventId={event.event_id}
            // //   readonly={mode === "detail"}
            // />
            <EventTicketStep
            event={event}
            mode={mode}
            onRefresh={() => refetch()}
            // onRefresh={() => {
            //   // invalidate/refetch event detail query
            //   // queryClient.invalidateQueries({ queryKey: ["event-detail", currentEventId] })
            // }}
          />
          )}

          {/* {step === CreateEventStep.PUBLISH && (
            <div className="rounded-xl border bg-white p-6">
              <Button
  disabled={isPending}
  onClick={() => toggleVisibility(event.id)}
>
  {event.isVisible ? "Ẩn sự kiện" : "Hiện sự kiện"}
</Button>
            </div>
          )} */}


{step === CreateEventStep.PUBLISH && event?.event_id && (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between gap-6">
      {/* Left */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Status Event
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Event display lifecycle management
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          Status:
          <span className="font-semibold">
            {EventStatus[event.status]}
          </span>
        </div>
      </div>

      {/* Action */}
      {(() => {
        const action = EventActionConfig(event.status);
        if (!action) {
          return (
            <span className="text-sm text-gray-400 italic">
              No action
            </span>
          );
        }

        /* Draft */
        if (action.type === "publish") {
          return (
            <div className="flex gap-2">
              {action.canDelete && (
                <Button
                  color="danger"
                  variant="bordered"
                  isLoading={isDeleting}
                  onClick={() => handleDeleteEvent(event.event_id)}
                >
                  Delete
                </Button>
              )}

              <Button
                isLoading={isPublishing}
                onClick={() => toggleVisibility(event.event_id)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {action.label}
              </Button>
            </div>
          );
        }

        /* Pending (Approve / Reject) */
        if (action.type === "review") {
          return (
            <div className="flex gap-2">
              <Button
                color="danger"
                variant="bordered"
                onClick={() => rejectEvent({
                  id: event.event_id,
                  payload: {
                    reason: cancelReason,
                  },
                })
                }
              >
                Reject
              </Button>

              <Button
                color="primary"
                onClick={() => approveEvent(event.event_id)}
              >
                Approve
              </Button>
            </div>
          );
        }

        /* Active → Cancel Request */
/* Active → Cancel Request */
if (action.type === "cancel-request") {
  return (
    <div className="flex flex-col gap-3 w-[320px]">
      <textarea
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        placeholder="Enter cancellation reason..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        rows={3}
      />

      <Button
        isLoading={isCancelRequesting}
        disabled={!cancelReason.trim()}
        onClick={() =>
          cancelRequestEvent({
            id: event.event_id,
            payload: { reason: cancelReason },
          })
        }
        className="bg-orange-500 hover:bg-orange-600 text-white"
      >
        {action.label}
      </Button>
    </div>
  );
}


        /* PendingCancellation → Finalize */
        if (action.type === "finalize-cancel") {
          return (
            <Button
              isLoading={isFinalizing}
              onClick={() => finalizeCancel(event.event_id)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {action.label}
            </Button>
          );
        }

        return null;
      })()}
    </div>
  </div>
)}



        </main>
      </div>
    </>
  );
}
