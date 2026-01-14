"use client";

import { AttachmentCardProps } from "../../../../types/event";
export default function AttachmentCard({
  value,
  localFile,
  readonly = false,
  onSelectFile,
  onRemove,
}: AttachmentCardProps) {
  /* =========================
     CASE 2: user chọn file mới
     ========================= */
  if (localFile) {
    return (
      <div className="mt-3 flex items-center justify-between rounded-xl border bg-gray-50 px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium break-all">
            {localFile.name}
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(localFile.size / 1024)} KB · Local file
          </span>
        </div>

        {!readonly && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-red-500 hover:underline cursor-pointer"
          >
            Remove
          </button>
        )}
      </div>
    );
  }

  /* =========================
     CASE 1: file từ BE
     ========================= */
  if (value) {
    return (
      <div className="mt-3 rounded-xl border bg-gray-50 px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <a
              href={value.url ?? "#"}
              target="_blank"
              className="text-sm font-medium text-blue-600 underline break-all"
            >
              {value.metadata?.name}
            </a>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              <span>
                <b>Type:</b> {getExt(value.metadata?.name)}
              </span>
              <span>
                <b>Size:</b> {formatFileSize(value.metadata?.size)}
              </span>
              <span className="truncate">
                <b>MIME:</b> {value.metadata?.content_type}
              </span>
            </div>

            <div className="text-xs text-gray-400">
              Uploaded by {value.metadata?.author_type} (ID:{" "}
              {value.metadata?.author_id})
            </div>
          </div>

          {!readonly && (
            <div className="flex gap-3 text-xs">
              <label className="cursor-pointer text-blue-600 hover:underline">
                Change
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && onSelectFile) onSelectFile(f);
                  }}
                />
              </label>

              <button
                type="button"
                onClick={onRemove}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* =========================
     CASE 3: create – chưa có gì
     ========================= */
  if (!readonly) {
    return (
      <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gray-50 px-6 py-8 text-sm text-gray-500 hover:bg-gray-100">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f && onSelectFile) onSelectFile(f);
          }}
        />
        Click to upload file
      </label>
    );
  }

  return null;
}


function formatFileSize(size?: string | null) {
    if (!size) return "-";
    const kb = Number(size) / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  }
  
function getExt(name?: string | null) {
    return name?.split(".").pop()?.toUpperCase() ?? "FILE";
  }
  