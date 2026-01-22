"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { useCreateReferendumMutation } from "@/hooks/useReferendum";
import type { ReferendumPayload } from "@/types/referendum";

export default function CreateReferendumPage() {
  const router = useRouter();
  const { mutate: createReferendum, isPending } =
    useCreateReferendumMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferendumPayload>({
    defaultValues: {
      title: "",
      description: "",
      settings: {
        is_anonymous: false,
        allow_multiple_choice: false,
        allow_change_vote: false,
      },
      options: [
        { label: "", description: "", order_index: 1 },
        { label: "", description: "", order_index: 2 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: ReferendumPayload) => {
    // đảm bảo order_index đúng thứ tự
    const payload: ReferendumPayload = {
      ...data,
      options: data.options.map((opt, index) => ({
        ...opt,
        order_index: index + 1,
      })),
    };

    createReferendum(payload);
  };

  return (
    <>
      <PageHeader
        title="Create Referendum"
        subtitle="Create a new referendum for residents to vote."
        showBack
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
      >
        {/* === BASIC INFO === */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Referendum title"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              rows={4}
              placeholder="Describe the referendum"
            />
          </div>
        </div>

        {/* === SETTINGS === */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Settings</h3>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("settings.is_anonymous")} />
            Anonymous voting
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("settings.allow_multiple_choice")}
            />
            Allow multiple choice
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("settings.allow_change_vote")}
            />
            Allow changing vote
          </label>
        </div>

        {/* === OPTIONS === */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Voting Options</h3>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium">Label</label>
                  <input
                    {...register(`options.${index}.label`, {
                      required: true,
                    })}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium">Description</label>
                  <input
                    {...register(`options.${index}.description`)}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Optional description"
                  />
                </div>
              </div>

              {fields.length > 2 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-2 text-xs text-red-600 hover:underline"
                >
                  Remove option
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                label: "",
                description: "",
                order_index: fields.length + 1,
              })
            }
            className="text-sm text-blue-600 hover:underline"
          >
            + Add option
          </button>
        </div>

        {/* === ACTIONS === */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {isPending ? "Creating..." : "Create Referendum"}
          </button>
        </div>
      </form>
    </>
  );
}
