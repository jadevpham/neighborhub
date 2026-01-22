// "use client";
// import { useEffect, useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { useCreateEventTicket, useUpdateEventTicket, useDeleteEventTicket } from "@/hooks/useEvent";
// import { EventTicketCreateFormProps, EventTicketPayload, TicketType } from "@/types/event";
// import { formatDate } from "@/utils/formatDate";
// import { useFieldArray } from "react-hook-form";
// import { FieldValues } from "react-hook-form";

// export default function EventTicketCreateForm({
//   eventId,
//   onSuccess,
//   ticket,
//   readonly = false,
//   onCreated,
//   onUpdated,
//   onDeleted,
// }: EventTicketCreateFormProps) {

//   const isEdit = !!ticket?.event_ticket_type_id;

//   const { mutate: createTicket, isPending: creating } = useCreateEventTicket();
//   const { mutate: updateTicket, isPending: updating } = useUpdateEventTicket();
//   const { mutate: deleteTicket, isPending: deleting } = useDeleteEventTicket();

//   const defaultValues = useMemo<EventTicketPayload>(() => {
//     if (!ticket) {
//       return {
//         type: 0,
//         quantity: 100,
//         currency: "VND",
//         url_third_party: [""],
//         ticket_sales_opening_time: { start_time: "", end_time: "" },
//         ticket_per_order: { min: 0, max: 0 },
//         ticket_name: "",
//         price: 0,
//       };
//     }

//     return {
//       ticket_name: ticket.ticket_name,
//       type: ticket.type,
//       price: Number(ticket.price ?? 0),
//       currency: ticket.currency ?? "VND",
//       quantity: Number(ticket.quantity ?? 0),
//       // url_third_party: ticket.url_third_party ?? [],
//       url_third_party: ticket.url_third_party?.length
//   ? ticket.url_third_party
//   : [""],
//       ticket_sales_opening_time: {
//         start_time: formatDate(ticket.ticket_sales_opening_time?.start_time),
//         end_time: formatDate(ticket.ticket_sales_opening_time?.end_time),
//       },
//       ticket_per_order: {
//         min: ticket.ticket_per_order?.min ?? 0,
//         max: ticket.ticket_per_order?.max ?? 0,
//       },
//     };
//   }, [ticket]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     getValues,
//     setValue,
//     control,
//     formState: { errors },
//   } = useForm<EventTicketPayload>({
//     defaultValues,
//   });

// const {
//   fields: urlFields,
//   append,
//   remove,
// } = useFieldArray<EventTicketPayload, "url_third_party">({
//   control,
//   name: "url_third_party",
// });

  
//   useEffect(() => {
//     reset(defaultValues);
//   }, [defaultValues, reset]);
//   // const onSubmit = (data: EventTicketPayload) => {
//   //   if (readonly) return;
//   //   if (ticketType === TicketType.FREE) {
//   //     data.price = 0;
//   //   }
  
//   //   if (ticketType === TicketType.AT_DOOR) {
//   //     delete data.ticket_per_order;
//   //   }
  
//   //   // if (ticketType === TicketType.THIRD_PARTY) {
//   //   //   data.price = 0;
//   //   //   data.quantity = 0;
//   //   //   delete data.ticket_per_order;
//   //   // }

//   //   if (ticketType === TicketType.THIRD_PARTY) {
//   //     return {
//   //       type: TicketType.THIRD_PARTY,
//   //       ticket_name: data.ticket_name,
//   //       url_third_party: data.url_third_party.filter(Boolean),
//   //     };
//   //   }
    
    
//   //   if (!isEdit) {
//   //     createTicket(
//   //       { id: eventId, data },
//   //       {
//   //         onSuccess: (res: any) => {
//   //           // tùy response BE bạn map lại ticket id
//   //           const newId =
//   //             res?.data?.event_ticket_type_id ??
//   //             res?.event_ticket_type_id ??
//   //             res?.data?.id ??
//   //             "";
//   //           onCreated?.(newId);
//   //         },
//   //       }
//   //     );
//   //     return;
//   //   }

//   //   updateTicket(
//   //     { id: eventId, ticketTypeId: ticket!.event_ticket_type_id, payload: data },
//   //     {
//   //       onSuccess: () => onUpdated?.(),
//   //     }
//   //   );
//   // };


//   const onSubmit = (data: EventTicketPayload) => {
//     if (readonly) return;
  
//     let payload: EventTicketPayload = { ...data };
  
//     if (ticketType === TicketType.FREE) {
//       payload.price = 0;
//     }
  
//     if (ticketType === TicketType.AT_DOOR) {
//       delete payload.ticket_per_order;
//     }
  
//     if (ticketType === TicketType.THIRD_PARTY) {
//       payload = {
//         type: TicketType.THIRD_PARTY,
//         ticket_name: data.ticket_name,
//         url_third_party: (data.url_third_party ?? []).filter(Boolean),
//       };
//     }
  
//     if (!isEdit) {
//       createTicket(
//         { id: eventId, data: payload },
//         {
//           onSuccess: (res: any) => {
//             const newId =
//               res?.data?.event_ticket_type_id ??
//               res?.event_ticket_type_id ??
//               res?.data?.id ??
//               "";
//             onCreated?.(newId);
//           },
//         }
//       );
//       return;
//     }
  
//     updateTicket(
//       {
//         id: eventId,
//         ticketTypeId: ticket!.event_ticket_type_id,
//         payload,
//       },
//       {
//         onSuccess: () => onUpdated?.(),
//       }
//     );
//   };
  
//   const handleDelete = () => {
//     if (readonly || !ticket?.event_ticket_type_id) return;

//     deleteTicket(
//       { id: eventId, ticketTypeId: ticket.event_ticket_type_id },
//       {
//         onSuccess: () => onDeleted?.(),
//       }
//     );
//   };
//   const ticketType = watch("type");
//   useEffect(() => {
//     if (ticketType === TicketType.FREE) {
//       setValue("price", 0);
//     }
//   }, [ticketType, setValue]);

//   useEffect(() => {
//     if (ticketType === TicketType.AT_DOOR) {
//       setValue("ticket_per_order", undefined);
//     }
  
//     if (ticketType === TicketType.THIRD_PARTY) {
//       setValue("ticket_per_order", undefined);
//       setValue("price", 0);
//       setValue("quantity", 0);
//     }
//   }, [ticketType, setValue]);
  
  
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 rounded-xl border bg-white p-6"
//     >
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold">
//           {isEdit ? "Ticket details" : "Create Ticket Type"}
//         </h3>

//         {readonly && (
//           <span className="text-xs text-gray-500">
//             Read-only (event is not draft)
//           </span>
//         )}
//       </div>
//       <div>
//   <label className="block text-sm font-medium">Ticket type</label>
//   <select
//     disabled={readonly}
//     {...register("type", { valueAsNumber: true })}
//     className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//   >
//     <option value={0}>Paid</option>
//     <option value={1}>Free</option>
//     <option value={2}>Third-party</option>
//     <option value={3}>At door</option>
//   </select>
// </div>

//       <div>
//         <label className="block text-sm font-medium">Ticket name</label>
//         <input
//           disabled={readonly}
//           {...register("ticket_name", { required: "Required" })}
//           className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//         />
//         {errors.ticket_name && (
//           <p className="text-sm text-red-500">{errors.ticket_name.message}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium">Price</label>
//           {/* <input
//             disabled={readonly}
//             type="number"
//             {...register("price", { min: 0 })}
//             className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//           /> */}

// <input
//   disabled={readonly || ticketType === TicketType.FREE}
//   type="number"
//   {...register("price", { min: 0 })}
//   className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
// />
//         </div>
//         {/*  */}


// {/*  */}
// {ticketType === TicketType.THIRD_PARTY && (
//   <div className="space-y-3">
//     <label className="block text-sm font-medium">
//       Third-party ticket URLs
//     </label>

//     {urlFields.map((field, index) => (
//       <div key={field.id} className="flex gap-2">
//         <input
//           disabled={readonly}
//           {...register(`url_third_party.${index}`, {
//             required: "URL is required",
//           })}
//           placeholder="https://ticketbox.vn/..."
//           className="flex-1 rounded-md border px-3 py-2 disabled:bg-gray-100"
//         />

//         {!readonly && (
//           <button
//             type="button"
//             onClick={() => remove(index)}
//             className="rounded-md border px-3 text-red-600 hover:bg-red-50"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//     ))}

//     {!readonly && (
//       <button
//         type="button"
//         onClick={() => append("")}
//         className="text-sm text-emerald-600 hover:underline"
//       >
//         + Add another URL
//       </button>
//     )}
//   </div>
// )}



// {/*  */}

// {/* {ticketType === TicketType.THIRD_PARTY && (
//   <div>
//     <label className="block text-sm font-medium">
//       Third-party ticket URL
//     </label>
//     <input
//       disabled={readonly}
//       {...register("url_third_party.0", { required: true })}
//       placeholder="https://ticketbox.vn/..."
//       className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//     />
//   </div>
// )} */}

//         <div>
//           <label className="block text-sm font-medium">Quantity</label>
//           <input
//             disabled={readonly}
//             type="number"
//             {...register("quantity", { min: 1 })}
//             className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium">Start time</label>
//           <input
//             disabled={readonly}
//             type="datetime-local"
//             {...register("ticket_sales_opening_time.start_time")}
//             className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">End time</label>
//           <input
//             disabled={readonly}
//             type="datetime-local"
//             {...register("ticket_sales_opening_time.end_time")}
//             className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>
//       </div>

//       {/* <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium">Min per order</label>
//           <input
//             disabled={readonly}
//             type="number"
//             {...register("ticket_per_order.min", { min: 1 })}
//             className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Max per order</label>
//           <input
//             disabled={readonly}
//             type="number"
//             {...register("ticket_per_order.max", { min: 1 })}
//             className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>
//       </div> */}



// {ticketType !== TicketType.THIRD_PARTY &&
//  ticketType !== TicketType.AT_DOOR && (
//   <div className="grid grid-cols-2 gap-4">
//     <div>
//       <label className="block text-sm font-medium">Min per order</label>
//       <input
//         disabled={readonly}
//         type="number"
//         {...register("ticket_per_order.min", { min: 1 })}
//         className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">Max per order</label>
//       <input
//         disabled={readonly}
//         type="number"
//         {...register("ticket_per_order.max", { min: 1 })}
//         className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
//       />
//     </div>
//   </div>
// )}

//       {/* ACTIONS */}
//       {!readonly && (
//         <div className="flex justify-end gap-3">
//           {isEdit && (
//             <button
//               type="button"
//               onClick={handleDelete}
//               disabled={deleting}
//               className="rounded-md border px-5 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </button>
//           )}

//           <button
//             type="submit"
//             disabled={creating || updating}
//             className="rounded-md bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
//           >
//             {creating
//               ? "Creating..."
//               : updating
//               ? "Updating..."
//               : isEdit
//               ? "Update"
//               : "Create ticket"}
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }



"use client";

import { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useCreateEventTicket,
  useUpdateEventTicket,
  useDeleteEventTicket,
} from "@/hooks/useEvent";
import {
  EventTicketCreateFormProps,
  EventTicketPayload,
  TicketType,
} from "@/types/event";
import { formatDate } from "@/utils/formatDate";

export default function EventTicketCreateForm({
  eventId,
  ticket,
  readonly = false,
  onCreated,
  onUpdated,
  onDeleted,
}: EventTicketCreateFormProps) {
  const isEdit = !!ticket?.event_ticket_type_id;

  const { mutate: createTicket, isPending: creating } = useCreateEventTicket();
  const { mutate: updateTicket, isPending: updating } = useUpdateEventTicket();
  const { mutate: deleteTicket, isPending: deleting } = useDeleteEventTicket();

  const defaultValues = useMemo<EventTicketPayload>(() => {
    if (!ticket) {
      return {
        type: TicketType.PAID,
        ticket_name: "",
        price: 0,
        quantity: 100,
        currency: "VND",
        url_third_party: [""],
        ticket_sales_opening_time: { start_time: "", end_time: "" },
        ticket_per_order: { min: 1, max: 4 },
      };
    }

    return {
      type: ticket.type,
      ticket_name: ticket.ticket_name,
      price: Number(ticket.price ?? 0),
      quantity: Number(ticket.quantity ?? 0),
      currency: ticket.currency ?? "VND",
      url_third_party: ticket.url_third_party?.length ? ticket.url_third_party : [""],
      ticket_sales_opening_time: {
        start_time: formatDate(ticket.ticket_sales_opening_time?.start_time),
        end_time: formatDate(ticket.ticket_sales_opening_time?.end_time),
      },
      ticket_per_order: {
        min: ticket.ticket_per_order?.min ?? 1,
        max: ticket.ticket_per_order?.max ?? 4,
      },
    };
  }, [ticket]);

  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<EventTicketPayload>({ defaultValues });

  const ticketType = watch("type");
  const isThirdParty = ticketType === TicketType.THIRD_PARTY;
  const isAtDoor = ticketType === TicketType.AT_DOOR;
  const isFree = ticketType === TicketType.FREE;

  const { fields, append, remove } = useFieldArray<EventTicketPayload, "url_third_party">({
    control,
    name: "url_third_party",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (isFree) setValue("price", 0);

    if (isAtDoor) setValue("ticket_per_order", undefined);

    if (isThirdParty) {
      setValue("price", 0);
      setValue("quantity", 0);
      setValue("ticket_per_order", undefined);
      // currency không cần, nhưng không bắt buộc phải xóa
      // setValue("currency", undefined);
    }
  }, [isFree, isAtDoor, isThirdParty, setValue]);

  const onSubmit = (data: EventTicketPayload) => {
    if (readonly) return;

    let payload: EventTicketPayload = { ...data };

    if (isThirdParty) {
      payload = {
        type: TicketType.THIRD_PARTY,
        ticket_name: data.ticket_name,
        url_third_party: data.url_third_party.filter(Boolean),
      };
    } else {
      if (isFree) payload.price = 0;
      if (isAtDoor) delete payload.ticket_per_order;
    }

    if (!isEdit) {
      createTicket(
        { id: eventId, data: payload },
        {
          onSuccess: (res: any) =>
            onCreated?.(res?.data?.event_ticket_type_id ?? res?.event_ticket_type_id),
        }
      );
      return;
    }

    updateTicket(
      { id: eventId, ticketTypeId: ticket!.event_ticket_type_id, payload },
      { onSuccess: () => onUpdated?.() }
    );
  };

  const handleDelete = () => {
    if (!ticket?.event_ticket_type_id || readonly) return;
    deleteTicket(
      { id: eventId, ticketTypeId: ticket.event_ticket_type_id },
      { onSuccess: () => onDeleted?.() }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-white p-6">
      {/* TYPE */}
      <div>
        <label className="block text-sm font-medium">Ticket type</label>
        <select
          disabled={readonly}
          {...register("type", { valueAsNumber: true })}
          className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
        >
          <option value={0}>Paid</option>
          <option value={1}>Free</option>
          <option value={2}>Third-party</option>
          <option value={3}>At door</option>
        </select>
      </div>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium">Ticket name</label>
        <input
          disabled={readonly}
          {...register("ticket_name", { required: true })}
          className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
        />
      </div>

      {/* THIRD PARTY URLS (ONLY) */}
      {isThirdParty && (
        <div className="space-y-3">
          <label className="block text-sm font-medium">Third-party ticket URLs</label>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                disabled={readonly}
                {...register(`url_third_party.${index}`, { required: true })}
                placeholder="https://ticketbox.vn/..."
                className="flex-1 rounded-md border px-3 py-2 disabled:bg-gray-100"
              />
              {!readonly && fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded-md border px-3 text-red-600 hover:bg-red-50"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {!readonly && (
            <button
              type="button"
              onClick={() => append("")}
              className="text-sm text-emerald-600 hover:underline"
            >
              + Add URL
            </button>
          )}
        </div>
      )}

      {/* NON THIRD-PARTY FIELDS */}
      {!isThirdParty && (
        <>
          {/* Price / Quantity / Currency on 1 row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                disabled={readonly || isFree}
                type="number"
                {...register("price")}
                className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                disabled={readonly}
                type="number"
                {...register("quantity")}
                className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Currency</label>
              <input
                disabled={readonly}
                {...register("currency")}
                placeholder="VND / USD / EUR"
                className="mt-1 w-full rounded-md border px-3 py-2 uppercase disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Start / End on 1 row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Start time</label>
              <input
                disabled={readonly}
                type="datetime-local"
                {...register("ticket_sales_opening_time.start_time")}
                className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">End time</label>
              <input
                disabled={readonly}
                type="datetime-local"
                {...register("ticket_sales_opening_time.end_time")}
                className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
              />
            </div>
          </div>
        </>
      )}

      {/* Min/Max per order on 1 row (hide for at_door & third_party) */}
      {!isThirdParty && !isAtDoor && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Min per order</label>
            <input
              disabled={readonly}
              type="number"
              {...register("ticket_per_order.min")}
              className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Max per order</label>
            <input
              disabled={readonly}
              type="number"
              {...register("ticket_per_order.max")}
              className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
            />
          </div>
        </div>
      )}

      {/* ACTIONS */}
      {!readonly && (
        <div className="flex justify-end gap-3">
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-md border px-5 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}

          <button
            type="submit"
            disabled={creating || updating}
            className="rounded-md bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {creating ? "Creating..." : updating ? "Updating..." : isEdit ? "Update" : "Create ticket"}
          </button>
        </div>
      )}
    </form>
  );
}

