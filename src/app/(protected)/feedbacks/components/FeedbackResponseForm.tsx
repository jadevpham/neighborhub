"use client";

import { useState } from "react";
import { Paperclip, X } from "lucide-react";
import { useCreateResponsesMutation } from "@/hooks/useFeedback";
export default function FeedbackResponseForm({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [internalNote, setInternalNote] = useState(false);

  const createResponse = useCreateResponsesMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    const payload = {
      content,
      type: internalNote ? 1 : 0, // 0 = PublicReply, 1 = InternalNote
      files,
    };

    createResponse.mutate(
      { id: feedbackId, payload },
      {
        onSuccess: () => {
          setContent("");
          setFiles([]);
          setInternalNote(false);
        },
      }
    );
  };

  return (
    <div className="mt-6 space-y-4">
      {/* TEXT INPUT */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a response..."
        className="w-full border rounded-lg p-3 h-28 focus:ring-emerald-600"
      />

      {/* FILE UPLOAD */}
      <div>
        <label className="text-sm font-medium text-emerald-800">Attachments</label>

        <div className="mt-2 flex items-center gap-3">
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            <Paperclip size={16} />
            Add files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* FILE PREVIEW */}
        {files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg text-sm"
              >
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INTERNAL NOTE + SEND */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            checked={internalNote}
            onChange={(e) => setInternalNote(e.target.checked)}
          />
          Internal note (not visible to resident)
        </label>

        <button
          onClick={handleSubmit}
          disabled={createResponse.isPending}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
        >
          {createResponse.isPending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
