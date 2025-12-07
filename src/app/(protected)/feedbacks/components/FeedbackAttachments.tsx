"use client";

import Image from "next/image";
import { FileAttachment } from "@/types/common";

export default function FeedbackAttachments({
  attachments,
}: {
  attachments?: FileAttachment[];
}) {
  if (!attachments?.length) return null;

  return (
    <div className="bg-white/40 p-5 rounded-2xl shadow-2xl border">
      <h3 className="text-lg font-semibold mb-4 text-emerald-800">Attachments</h3>

      <div className="flex gap-4">
        {attachments.map((a) => (
          <div
            key={a.attachment_id}
            className="text-center text-sm text-gray-500"
          >
            <Image
              src={a.url || "/placeholder.png"}
              width={120}
              height={90}
              className="rounded-lg border"
              alt="Attachment"
            />
            <p className="mt-2">{a.metadata?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
