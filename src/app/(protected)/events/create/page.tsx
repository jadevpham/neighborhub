// "use client";
// import { useCreateEvent } from "@/hooks/useEvent";
// import { CreateEventStep, EventData, EventPayload, EventResponse  } from "@/types/event";
// import PageHeader from "@/components/PageHeader";
// import EventCreateSidebar from "../components/EventCreateSidebar";
// import EventCreateForm from "../components/EventCreateForm";
// import EventTicketCreateForm from "../components/EventTicketCreateForm";
// import { useState } from "react";
// export default function CreateEventPage() {


//   const [step, setStep] = useState<CreateEventStep>(CreateEventStep.BUILD);

//   const [event, setEvent] = useState<EventResponse  | null>(null);

//   return (
//     <>
//       <PageHeader
//         title="Events Management — Create New Event"
//         subtitle="Create and publish a new event with full details and settings."
//         showBack={true}
//       />
//       <div className="flex gap-8">
//         {/* Sidebar */}
//         <EventCreateSidebar
//           currentStep={step}
//           onStepChange={setStep}
//           event={event}
//         />
//         {/* Main content */}
//         <main className="flex-1">
//         <div className={step === CreateEventStep.BUILD ? "block" : "hidden"}>

//           {/* {step === CreateEventStep.BUILD && ( */}
//             <EventCreateForm
//             event={event} 
//               onSuccess={(createdEvent) => {
//                 setEvent(createdEvent as unknown as EventResponse);
//                 setStep(CreateEventStep.TICKET);
//               }}
//             />
//           {/* )} */}
//           </div>
//           <div className={step === CreateEventStep.TICKET ? "block" : "hidden"}>
//           {(() => {
//   console.log("EVENT IN TICKET STEP:", event);
//   return null;
// })()}

//           {/* console.log("EVENT IN TICKET STEP:", event); */}
//           {event && (
//             <EventTicketCreateForm eventId={event.event_id} />
//           )}
//           </div>
//           <div className={step === CreateEventStep.PUBLISH ? "block" : "hidden"}>
//           {step === CreateEventStep.PUBLISH && (
//             <div className="rounded-xl border bg-white p-6">
//               Publish step (coming soon)
//             </div>
//           )}
//           </div>
//         </main>
//       </div>
//       {/* {isSuccess && <p>Created successfully</p>}
//       {isError && <p>Something went wrong</p>} */}
//     </>
//   );
// }
// /events/create/page.tsx
import EventEditorPage from "../components/EventEditorPage";

export default function CreateEventPage() {
  return <EventEditorPage mode="create" />;
}
