"use client";

import { ResponseFeedback } from "@/types/feedback";
import { formatDate } from "@/utils/formatDate";
export default function FeedbackResponses({
  responses,
}: {
  responses?: ResponseFeedback[];
}) {
  if (!responses?.length)
    return <p className="text-gray-500">No responses yet.</p>;

  return (
    <div className="space-y-5">
      {responses.map((r) => (
        <div key={r.id} className="flex gap-3 items-start">
          {/* Avatar */}
          <img
            src={
              r.responder?.avatar ||
              "https://ui-avatars.com/api/?name=User&background=E5E7EB&color=374151"
            }
            width={36}
            className="rounded-full"
          />

          <div className="w-full">
            {/* Name */}
            <p className="font-medium">{r.responder?.name}</p>

            {/* Content */}
            {r.content && (
              <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                {r.content}
              </p>
            )}

            {/* ATTACHMENTS */}
            {r.attachments?.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {r.attachments.map((file, idx) => {
                  const isImage =
                    file.metadata?.content_type?.startsWith("image/") ||
                    file.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

                  return (
                    <a
                      key={idx}
                      href={file.url || "#"}
                      target="_blank"
                      className="block"
                    >
                      {isImage ? (
                        <img
                          src={file.url || ""}
                          className="w-24 h-20 object-cover rounded-lg border"
                          alt="attachment"
                        />
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm border">
                          📎 <span>{file.metadata?.name}</span>
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            ) : null}

            {/* Time */}
            <p className="text-xs text-gray-400 mt-2">{formatDate(r.responded_at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
