"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export function CoverImageField() {
  const methods = useFormContext();

  if (!methods) {
    throw new Error("CoverImageField must be used inside FormProvider");
  }

  const { register, setValue, watch } = methods;

  const [preview, setPreview] = useState<string | null>(null);

  const file = watch("cover_image")?.[0];

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="space-y-2">
      <label className="font-medium">Cover Image *</label>

      {!preview ? (
        <label className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition w-full flex flex-col items-center gap-3">
          <input
            type="file"
            accept="image/*"
            {...register("cover_image", { required: true })}
            className="hidden"
          />
          <div className="text-gray-500 text-sm">
            Click to upload or drag & drop
          </div>
        </label>
      ) : (
        <div className="relative w-full">
          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={400}
            className="rounded-xl shadow-md object-cover w-full h-64"
          />

          <label className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 border rounded-lg cursor-pointer text-sm hover:bg-white shadow">
            Change image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("cover_image")}
            />
          </label>

          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setValue("cover_image", null as any);
            }}
            className="absolute bottom-3 right-3 px-3 py-1 bg-red-500 text-white rounded-lg text-sm shadow hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
