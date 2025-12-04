"use client";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { NewsFormProps } from "@/types/news";
import { toBEDateTimeLocal } from "@/utils/formatDate";

export default function NewsForm({
  initialData,
  onSubmit,
  submitting = false,
  onCancel,
}: NewsFormProps) {
  // ============ BASIC FIELDS =============
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [status, setStatus] = useState(initialData?.status ?? 0);
  const [scheduledAt, setScheduledAt] = useState<string | null>(
    initialData?.scheduled_at || null
  );

  // ============ COVER IMAGE =============
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [removeCover, setRemoveCover] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.cover_image || null
  );

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
    setRemoveCover(false); // vì user upload ảnh mới
  };

  const handleRemoveCover = () => {
    setCoverImage(null);
    setCoverPreview(null);
    if (initialData?.cover_image) setRemoveCover(true); // chỉ gửi cờ xoá khi update
  };

  // ============ FILES (NEW + OLD) =============
  const existingFiles = initialData?.files || []; // file từ BE
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [removeAllFiles, setRemoveAllFiles] = useState(false);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...selected]);
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (index: number) => {
    // BE không hỗ trợ remove từng file → bắt buộc remove_all_files = true
    setRemoveAllFiles(true);
  };

  // ============ SUBMIT HANDLER =============
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      title,
      content,
      status,
      scheduled_at: status === 3 ? toBEDateTimeLocal(scheduledAt) : null,

      cover_image: coverImage || null,
      remove_cover_image: removeCover,

      files: newFiles, // chỉ gửi file mới
      remove_all_files: removeAllFiles,
    };

    onSubmit(payload);
  };

  // ============ RENDER UI =============
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/50 shadow-lg rounded-xl border p-6 space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      {/* COVER */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Cover Image
        </label>

        {coverPreview ? (
          <div className="relative w-48">
            <img
              src={coverPreview}
              className="w-48 h-32 rounded-lg object-cover"
            />

            <button
              type="button"
              onClick={handleRemoveCover}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-48 h-32 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload size={22} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleCoverChange}
            />
          </label>
        )}
      </div>

      {/* CONTENT */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* FILES */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Attachments
        </label>

        {/* Upload New Files */}
        <label className="flex items-center justify-center w-48 h-32 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <Upload size={22} />
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />
        </label>

        {/* Existing Files from BE */}
        {existingFiles.length > 0 && !removeAllFiles && (
          <div className="mt-4 space-y-2">
            <p className="font-medium text-gray-700">Existing Files</p>

            {existingFiles.map((file, idx) => (
              <div
                key={file.attachment_id}
                className="flex justify-between items-center p-2 border rounded-lg"
              >
                <div>
                  <p className="font-semibold text-sm">{file.metadata?.name}</p>
                  <p className="text-xs text-gray-600">
                    {file.metadata?.content_type}
                  </p>
                  <p className="text-xs text-gray-600">
                    {file.metadata?.size
                      ? (Number(file.metadata.size) / 1024).toFixed(1)
                      : "—"}{" "}
                    KB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeExistingFile(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New uploaded files */}
        {newFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="font-medium text-gray-700">New Files</p>

            {newFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 border rounded-lg"
              >
                <div>
                  <p className="text-sm font-semibold">{file.name}</p>
                  <p className="text-xs text-gray-600">{file.type}</p>
                  <p className="text-xs text-gray-600">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeNewFile(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATUS + SCHEDULE */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value={0}>Draft</option>
            <option value={1}>Published</option>
            <option value={3}>Scheduled</option>
          </select>
        </div>

        {status === 3 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Scheduled At
            </label>
            <input
              type="datetime-local"
              value={scheduledAt || ""}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 
               hover:bg-gray-100 transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 
               disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
