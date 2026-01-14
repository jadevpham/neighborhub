"use client";

import { useForm } from "react-hook-form";
import { useCreateEventTicket } from "@/hooks/useEvent";
import { EventTicketCreateFormProps, EventTicketPayload } from "@/types/event";

export default function EventTicketCreateForm({
  eventId,
  onSuccess,
}: EventTicketCreateFormProps) {
  const { mutate, isPending } = useCreateEventTicket();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventTicketPayload>({
    defaultValues: {
      type: 0,
      quantity: 100,
      currency: "VND",
      url_third_party: [],
      ticket_sales_opening_time: {
        start_time: "",
        end_time: "",
      },
      ticket_per_order: {
        min: 1,
        max: 4,
      },
    },
  });

  const onSubmit = (data: EventTicketPayload) => {
    mutate(
      {
        id: eventId,
        data,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border bg-white p-6"
    >
      <h3 className="text-lg font-semibold">Create Ticket Type</h3>

      {/* Ticket name */}
      <div>
        <label className="block text-sm font-medium">Ticket name</label>
        <input
          {...register("ticket_name", { required: "Required" })}
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
        {errors.ticket_name && (
          <p className="text-sm text-red-500">
            {errors.ticket_name.message}
          </p>
        )}
      </div>

      {/* Price + Quantity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            {...register("price", { min: 0 })}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            {...register("quantity", { min: 1 })}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      {/* Sale time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start time</label>
          <input
            type="datetime-local"
            {...register("ticket_sales_opening_time.start_time")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End time</label>
          <input
            type="datetime-local"
            {...register("ticket_sales_opening_time.end_time")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      {/* Ticket per order */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Min per order</label>
          <input
            type="number"
            {...register("ticket_per_order.min", { min: 1 })}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Max per order</label>
          <input
            type="number"
            {...register("ticket_per_order.max", { min: 1 })}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create ticket"}
        </button>
      </div>
    </form>
  );
}
