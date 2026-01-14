import { CreateEventStep, EventCreateSidebarProps } from "@/types/event";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export default function EventCreateSidebar({
  currentStep,
  onStepChange,
  event,
}: EventCreateSidebarProps) {
  const steps = [
    {
      key: CreateEventStep.BUILD,
      title: "Build event page",
      description:
        "Add all of your event details and let attendees know what to expect",
      disabled: false,
    },
    {
      key: CreateEventStep.TICKET,
      title: "Add tickets",
      description: "Create ticket types and pricing",
      disabled: !event,
    },
    {
      key: CreateEventStep.PUBLISH,
      title: "Publish",
      description: "Publish your event and start selling tickets",
      disabled: !event,
    },
  ];

  return (
    <aside className="w-[300px] space-y-6">
      {/* Event card */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold">
          {event?.event_title || "Event Title"}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4" />
          {event
            ? formatDate(event.overall_start_date)
            : "Date & time will appear here"}
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
          {event?.status || "Draft"}
        </div>
      </div>

      {/* Steps */}
      <div>
        <p className="mb-3 text-sm font-semibold text-gray-500">
          Steps
        </p>

        <div className="space-y-2">
          {steps.map((step) => {
            const isActive = currentStep === step.key;

            return (
              <button
                key={step.key}
                disabled={step.disabled}
                onClick={() => onStepChange(step.key)}
                className={`
                  w-full rounded-xl border p-4 text-left transition
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }
                  ${
                    step.disabled
                      ? "cursor-not-allowed opacity-40"
                      : "hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-4 w-4 rounded-full border-2
                      ${
                        isActive
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }
                    `}
                  />

                  <div>
                    <p className="font-medium">
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
