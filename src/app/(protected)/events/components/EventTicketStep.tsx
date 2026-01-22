"use client";

import { useMemo, useState } from "react";
import type { EventDetailResponse, EventTicketStepProps, TicketType } from "@/types/event";
import EventTicketCreateForm from "./EventTicketCreateForm";
import { ticketTypeMap } from "@/components/StatusBadge";
export default function EventTicketStep({ event, mode, onRefresh }: EventTicketStepProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const tickets = event.ticket_types ?? [];

  const selectedTicket = useMemo(() => {
    if (!selectedTicketId) return null;
    return tickets.find((t) => t.event_ticket_type_id === selectedTicketId) ?? null;
  }, [tickets, selectedTicketId]);

  const isDraft = event.status === 0; // draft
  const readonly = !isDraft; // status khác → disable + ẩn nút
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT: Ticket list (Drive/Notion style) */}
      <aside className="col-span-4 rounded-xl border bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold">Ticket Types</div>
          <button
            type="button"
            className="text-xs text-emerald-700 hover:underline cursor-pointer"
            onClick={() => setSelectedTicketId(null)}
            disabled={readonly}
            title={readonly ? "Event is not draft" : "Create a new ticket"}
          >
            + New
          </button>
        </div>

        <div className="divide-y">
          {tickets.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No tickets yet</div>
          ) : (
            tickets.map((t) => {
              const active = t.event_ticket_type_id === selectedTicketId;
              return (
                <button
                  key={t.event_ticket_type_id}
                  type="button"
                  onClick={() => setSelectedTicketId(t.event_ticket_type_id ?? null)}
                  className={[
                    "w-full text-left px-4 py-3 hover:bg-gray-50",
                    active ? "bg-emerald-50" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        {t.ticket_name}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                        <span>{t.currency} {t.price}</span>
                        <span>Qty: {t.quantity}</span>
                        <span>Status: {t.status}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {/* {t.type === 0 ? "Regular" : `Type ${t.type}`}
                       */}
                        {ticketTypeMap[t.type as TicketType] ?? "Unknown"}
                    </span>                    
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* RIGHT: Re-use form */}
      <section className="col-span-8">
        <EventTicketCreateForm
          eventId={event.event_id}
          ticket={selectedTicket}          
          readonly={readonly}              
          onCreated={(newTicketId) => {    
            setSelectedTicketId(newTicketId);
            onRefresh?.();
          }}
          onUpdated={() => onRefresh?.()}
          onDeleted={() => {
            setSelectedTicketId(null);
            onRefresh?.();
          }}
        />
      </section>
    </div>
  );
}
