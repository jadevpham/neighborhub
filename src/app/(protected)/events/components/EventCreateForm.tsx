"use client";

import { Controller, useForm } from "react-hook-form";
import { EventCreateFormProps, EventPayload, EventDetailResponse } from "@/types/event";
import { useCreateEvent } from "@/hooks/useEvent";
import { toast } from "sonner";
import axios from "axios";
import { useMeQuery } from "@/hooks/useAuth";
import { useSitesPartnerQuery } from "@/hooks/useSites";
import { useEffect, useState } from "react";
import AttachmentCard from "./AttachmentCard";
import { useDebounce } from "use-debounce";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function EventCreateForm({
  event,
  onSuccess,
  readonly = false,
}: EventCreateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    unregister,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      hash_tag: [] as any,
    },
  });

  const { data: meData } = useMeQuery();
  const role = meData?.user?.role;
  const site = meData?.scope?.site;
  const zone = meData?.scope?.zone;

  const [siteSearch, setSiteSearch] = useState("");
  const [debouncedSearch] = useDebounce(siteSearch, 400);
  const { data: sitesData, isLoading } = useSitesPartnerQuery(
    { page: 1, limit: 1000, search: debouncedSearch || undefined, },
    { enabled: role === "partner" }
  );

  console.log("sites partner Data: ", sitesData);

  const siteOptions =
    sitesData?.data?.map((s) => ({
      key: String(s.siteId),
      label: s.siteName,
    })) ?? [];


  const { mutate: createEvent, isPending } = useCreateEvent();

  /* -------------------------
  SET location
  ------------------------- */
  useEffect(() => {
    if (role === "site_admin" && site?.id) {
      setValue("location", site.id.toString(), { shouldValidate: true });
    }

    if (role === "management_board" && zone?.id) {
      setValue("location", zone.id.toString(), { shouldValidate: true });
    }
  }, [role, site, zone, setValue]);

  /* -------------------------
  Cover image preview
  ------------------------- */
  const [preview, setPreview] = useState<string | null>(null);
  // const file = (watch("cover_image") as unknown as FileList)?.[0];
  const coverImageFile = (watch("cover_image") as FileList)?.[0];
  // const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | undefined>(undefined);

  // Preview từ BE
  useEffect(() => {
    if (!event?.cover_image_url) return;

    // chỉ set nếu user chưa chọn ảnh mới
    if (!coverImageFile) {
      setPreview(event.cover_image_url);
    }
  }, [event?.cover_image_url, coverImageFile]);
  // Preview từ file local
  useEffect(() => {
    if (!coverImageFile) return;
    const url = URL.createObjectURL(coverImageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImageFile]);

  /* -------------------------
  Submit
  ------------------------- */
  const onSubmit = (data: EventPayload) => {
    console.log("SUBMIT DATA", data);

    const payload: EventPayload = {
      location: data.location!,
      event_title: data.event_title,
      overview_description: data.overview_description,
      cover_image: coverImageFile,
      files: attachmentFile,
      // cover_image: file,
      // file: file,
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
      est_attendees: data.est_attendees,
      hash_tag: data.hash_tag
        ? String(data.hash_tag)
          .split(",")
          .map((x) => x.trim())
        : [],

    };

    createEvent(payload, {
      onSuccess: (event) => {
        toast.success("Event created successfully");
        onSuccess?.(event);
      },
      onError: (err: any) => {
        if (axios.isAxiosError(err) && err.response?.data?.errors) {
          const errors = err.response.data.errors as Record<string, string[]>;

          Object.values(errors).forEach((messages) => {
            messages.forEach((msg) => toast.error(msg));
          });

          return;
        }

        toast.error("Failed to create event");
      },

    });
  };

  useEffect(() => {
    if (event) {
      reset(mapEventResponseToFormValues(event));
    }
  }, [event]);

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(onSubmit, (e) =>
        console.log("FORM ERRORS", e)
      )}
      className="space-y-6 max-w-3xl bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-xl font-semibold">Create New Event</h2>

      {/* hidden fields */}
      {/* <input type="hidden" {...register("location", { required: true })} /> */}

      {/* LOCATION */}

      {/* /* ===== SITE ADMIN ===== */}
      {role === "site_admin" && (
        <div>
          <label className="font-medium">Location *</label>
          <input
            value={site?.name ?? ""}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>
      )}

      {/* /* ===== MANAGEMENT BOARD ===== */}
      {role === "management_board" && (
        <div>
          <label className="font-medium">Location *</label>
          <input
            value={zone?.name ?? ""}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>
      )}

      {/* /* ===== PARTNER ===== */}
      {role === "partner" && (
        <div className="space-y-2 mb-6">
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div
                className={`transition-all duration-200 ${isLocationOpen ? "mb-[260px]" : "mb-0"
                  }`}
              >
                <label className="font-medium">Location *</label>
                <Autocomplete
                  // label="Location *"
                  labelPlacement="outside"
                  placeholder="Search site..."
                  className="w-full"
                  items={siteOptions}
                  inputValue={siteSearch}
                  onInputChange={setSiteSearch}
                  selectedKey={field.value || null}
                  onSelectionChange={(key) => field.onChange(key ?? "")}
                  menuTrigger="focus"
                  onOpenChange={setIsLocationOpen}
                  popoverProps={{
                    portalContainer: document.body,
                  }}
                  classNames={{
                    popoverContent: "z-[9999]",
                    listbox: "max-h-[240px] overflow-y-auto",
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.key} textValue={item.label}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            )}
          />
        </div>
      )}

      {/* TITLE */}
      <div>
        <label className="font-medium">Event Title *</label>
        <input
          {...register("event_title", { required: true })}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="font-medium">Overview Description *</label>
        <textarea
          {...register("overview_description", { required: true })}
          className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
        />
      </div>

      {/* COVER IMAGE */}
      <div>
        <label className="font-medium">Cover Image *</label>

        {!preview ? (
          <label className="border-2 border-dashed rounded-xl p-6 cursor-pointer block text-center">
            <input
              type="file"
              accept="image/*"
              {...register("cover_image", { required: true })}
              className="hidden"
            />
            Click to upload
          </label>
        ) : (
          <div className="relative">
            <img
              src={preview}
              className="rounded-xl w-full h-64 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                unregister("cover_image");
              }}
              className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      {/* FILE ATTACHMENT */}
      <div className="mt-6">
        <label className="font-medium">Attachment</label>

        <AttachmentCard
          value={event?.files}
          localFile={attachmentFile}
          readonly={readonly}
          onSelectFile={(file) => setAttachmentFile(file)}
          onRemove={() => setAttachmentFile(undefined)}
        />
      </div>
      {/* DATES */}
      <div className="grid grid-cols-2 gap-4">
        <label className="font-medium">Start Date *</label>
        <input
          type="datetime-local"
          {...register("start_date", { required: true })}
          className="border rounded px-3 py-2"
        />
        <label className="font-medium">End Date *</label>
        <input
          type="datetime-local"
          {...register("end_date", { required: true })}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* ATTENDEES */}
      <label className="font-medium">Estimated Attendees *</label>
      <input
        type="number"
        {...register("est_attendees", { required: true })}
        className="border rounded px-3 py-2 w-full"
        placeholder="1000"
      />

      {/* TAGS */}
      <div>
        <label className="font-medium">Hash Tags (comma separated)</label>
        <input
          type="text"
          {...register("hash_tag")}
          className="border rounded px-3 py-2 w-full"
          placeholder="music, charity"
        />
        <p className="text-xs text-gray-500 mt-1">
          Example: <b>music, charity, event</b>
        </p>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-emerald-600 text-white px-5 py-2 rounded disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Saving..." : "Save and Continue"}
      </button>
    </form>
  );
}
function mapEventResponseToFormValues(
  event: EventDetailResponse
) {
  return {
    location:
      typeof event.location === "object"
        ? event.location?.siteId ??
        event.location?.zoneId ??
        ""
        : event.location ?? "",


    event_title: event.event_title ?? "",
    overview_description: event.overview_description ?? "",

    start_date: event.overall_start_date
      ? event.overall_start_date.slice(0, 16)
      : "",

    end_date: event.overall_end_date
      ? event.overall_end_date.slice(0, 16)
      : "",

    est_attendees: event.est_attendees ?? "",

    hash_tag: event.hash_tags?.join(", ") ?? "",
  };
}