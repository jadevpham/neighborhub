"use client";

import { useParams } from "next/navigation";
import { useNewsDetailQuery } from "@/hooks/useNews";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { newsStatusMap } from "@/components/StatusBadge";
import { NewsReactions } from "../components/NewsReactions";
import PageHeader from "@/components/PageHeader";
import { useConfirm } from "@/components/ConfirmProvider";
import { DeleteButton } from "@/components/DeleteButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { data, isLoading } = useNewsDetailQuery(id as string);

  const item = data?.data;
  const handleDeleted = () => {
    toast.success("News deleted successfully");
    router.push("/news"); // quay về danh sách
  };
  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!item) return <p className="p-4">News not found.</p>;
  return (
    <>
      <PageHeader
        title="News Management - New Detail"
        subtitle="Full details of the selected news post"
        showBack={true}
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* =============== LEFT CONTENT (2/3) =============== */}
        <div className="lg:col-span-2 space-y-8">
          {/* TITLE + STATUS BADGE*/}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-6">
              {/* TITLE */}
              <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>

              {/* STATUS BADGE */}
              <span
                className={` px-3 py-1 rounded-full text-xs font-semibold ${
                  newsStatusMap[item.status ?? 0].badge
                }`}
              >
                {newsStatusMap[item.status ?? 0].label}
              </span>
            </div>
          </div>
          {/* PUBLISHED AT + SCHEDULED AT */}
          {(item.status === 1 || item.status === 3) && (
            <div className="flex justify-center">
              <div className="flex items-center gap-3 text-gray-700">
                <CircleCheck size={16} className="text-green-600" />
                {/* PUBLISHED AT */}
                {item.published_at && (
                  <>
                    <span className="font-medium">Published at:</span>
                    <span>{formatDate(item.published_at)}</span>
                  </>
                )}
                {/* SCHEDULED AT */}
                {item.scheduled_at && (
                  <>
                    <span className="font-medium">Scheduled at:</span>
                    <span>{formatDate(item.scheduled_at)}</span>
                  </>
                )}
              </div>
            </div>
          )}
          {/* COVER */}
          <div className="w-full h-[260px] rounded-xl overflow-hidden shadow-sm mb-6">
            {item.cover_image && (
              <img
                src={item.cover_image}
                className="w-full h-full object-cover"
                alt={item.title || "cover-image"}
              />
            )}
          </div>
          {/* CONTENT */}
          <div className="prose mt-6 text-gray-800 leading-relaxed whitespace-pre-line">
            {item.content}
          </div>
          {/* FILE ATTACHMENTS */}
          {item.files && item.files.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                Attachments
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {item.files.map((f) => (
                  <a
                    key={f.attachment_id}
                    href={f.url || "#"}
                    target="_blank"
                    className="block p-3 border rounded-md hover:bg-gray-50 shadow-sm"
                  >
                    <p className="text-sm font-medium">{f.metadata?.name}</p>
                    <p className="text-xs text-gray-500">
                      {f.metadata?.content_type} — {f.metadata?.size} bytes
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
          {/* REACTIONS + VIEWS */}
          <NewsReactions
            reactions={item.reactions}
            views={item.views}
            size={20} // icon to bigger for detail page
            viewColor="text-gray-700"
          />
          {/* AUTHOR SECTION */}
          <div className="grid grid-cols-2 gap-6 pb-4 border-y">
            {/* CREATE BY */}
            <div>
              <h3 className="font-semibold text-emerald-800 mb-3">Create by</h3>
              <div className="flex items-center gap-3">
                {item.created_by?.avatar ? (
                  <img
                    src={item.created_by.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                )}

                <div>
                  <p className="font-medium text-gray-900">
                    {item.created_by?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* UPDATE BY */}
            <div>
              <h3 className="font-semibold text-emerald-800 mb-3 text-right">
                Update by
              </h3>
              <div className="flex items-center justify-end gap-3">
                {item.updated_by?.avatar ? (
                  <img
                    src={item.updated_by.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                )}

                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {item.updated_by?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(item.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* UPDATE + DELETE */}
          <DeleteButton
            ids={id}
            resourceName="news"
            onDeleted={handleDeleted}
          />
        </div>
        {/* =============== RIGHT COLUMN (1/3) =============== */}
        <div className="lg:col-span-1 space-y-6">
          {/* COMMENTS */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4">
              Comments
            </h2>

            {item.comments?.length === 0 && (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}

            <div className="flex flex-col gap-5">
              {item.comments?.map((c) => (
                <div key={c.id} className="flex gap-3">
                  {/* AVATAR */}
                  {!c.resident?.anonymous && c.resident?.avatar ? (
                    <img
                      src={c.resident.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  )}

                  {/* BUBBLE */}
                  <div className="flex-1">
                    <div className="bg-gray-100 px-4 py-3 rounded-xl shadow-sm">
                      <p className="font-medium text-gray-900">
                        {c.resident?.anonymous
                          ? "Anonymous Resident"
                          : c.resident?.name}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>
                          {formatDate(
                            c.updated_at && c.updated_at !== c.created_at
                              ? c.updated_at
                              : c.created_at
                          )}
                        </span>
                        {c.updated_at && c.updated_at !== c.created_at && (
                          <span className="text-gray-400">(edited)</span>
                        )}
                      </div>
                      <p className="text-gray-800 mt-1 whitespace-pre-wrap">
                        {c.text}
                      </p>

                      {/* IMAGES INSIDE COMMENT */}
                      {Array.isArray(c.img) && c.img.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {c.img.map((imgUrl, index) => (
                            <img
                              key={index}
                              src={imgUrl}
                              className="rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* TIME + ACTIONS */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* COMMENT INPUT */}
          <div className="mt-8 flex items-center gap-3 border-t pt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full px-4 py-2 bg-gray-100 rounded-full outline-none"
            />
            <button className="text-emerald-600 font-semibold">Post</button>
          </div>
        </div>
      </div>
    </>
  );
}
