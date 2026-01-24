"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  useReferendumDetailQuery,
  useCloseReferendumMutation,
  useDeleteReferendumMutation,
} from "@/hooks/useReferendum";
import { ReferendumStatus } from "@/types/referendum";
import { referendumStatusMap } from "@/components/StatusBadge";
import { formatDate } from "@/utils/formatDate";
export default function ReferendumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useReferendumDetailQuery(id);
  const { mutate: closeReferendum, isPending: isClosing } =
    useCloseReferendumMutation();
  const { mutate: deleteReferendum, isPending: isDeleting } =
    useDeleteReferendumMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load referendum.</p>;

  const statusUI =
    referendumStatusMap[
      (data.status ?? "unknown") as ReferendumStatus | "unknown"
    ];

  const handleClose = () => {
    closeReferendum(id);
  };

  const handleDelete = () => {
    deleteReferendum({
      referendumId: id,
      payload: {
        reason: deleteReason,
      },
    });
    setShowDeleteModal(false);
    router.push("/referendums");
  };
  const options = data.options ?? [];

  return (
    <>
      <PageHeader
        title="Referendum Detail"
        subtitle="View referendum information and results."
        showBack
      />

      {/* === BASIC INFO === */}
      <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">{data.title}</h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusUI.badge}`}
          >
            {statusUI.label}
          </span>
        </div>

        <p className="text-sm text-gray-600">{data.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <b>Site:</b> {data.site_name}
          </div>
          <div>
            <b>Zone:</b> {data.zone_name}
          </div>
          <div>
            <b>Created by:</b> {data.creator_name}
          </div>
          <div>
            <b>Created at:</b>{" "}
            {formatDate(data.created_at)}
          </div>
          <div>
            <b>Total votes:</b> {data.total_votes}
          </div>
        </div>
      </div>

      {/* === SETTINGS === */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm space-y-2">
        <h3 className="font-semibold text-sm">Settings</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          <li>Anonymous voting: {data.settings?.is_anonymous ? "Yes" : "No"}</li>
          <li>
            Multiple choice:{" "}
            {data.settings?.allow_multiple_choice ? "Yes" : "No"}
          </li>
          <li>
            Change vote:{" "}
            {data.settings?.allow_change_vote ? "Yes" : "No"}
          </li>
        </ul>
      </div>

      {/* === OPTIONS / RESULTS === */}
      {/* <div className="mt-6 rounded-xl bg-white p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm">Voting Results</h3>
        {!data.options || data.options.length === 0 ? (
  <p className="text-sm text-gray-500 italic">
    No voting options available.
  </p>
) : (
        {data.options.map((opt) => (
          <div key={opt.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>
                {opt.order_index}. {opt.label}
              </span>
              <span className="text-gray-600">
                {opt.vote_count} votes ({opt.percentage}%)
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${opt.percentage}%` }}
              />
            </div>

            {opt.description && (
              <p className="text-xs text-gray-500">{opt.description}</p>
            )}
          </div>
        )))}
      </div> */}
{/* === OPTIONS / RESULTS === */}
<div className="mt-6 rounded-xl bg-white p-6 shadow-sm space-y-4">
  <h3 className="font-semibold text-sm">Voting Results</h3>

  {options.length === 0 ? (
    <p className="text-sm text-gray-500 italic">
      No voting options available.
    </p>
  ) : (
    options.map((opt) => (
      <div key={opt.id} className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>
            {opt.order_index}. {opt.label}
          </span>
          <span className="text-gray-600">
            {opt.vote_count} votes ({opt.percentage}%)
          </span>
        </div>

        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${opt.percentage}%` }}
          />
        </div>

        {opt.description && (
          <p className="text-xs text-gray-500">{opt.description}</p>
        )}
      </div>
    ))
  )}
</div>

      {/* === ACTIONS === */}
      <div className="mt-6 flex justify-end gap-3">
        {data.status === ReferendumStatus.Active && (
          <button
            onClick={handleClose}
            disabled={isClosing}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Close Referendum
          </button>
        )}

        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={isDeleting}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Delete Referendum
        </button>
      </div>

      {/* === DELETE MODAL === */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-4">
            <h3 className="font-semibold">Delete Referendum</h3>

            <textarea
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              rows={3}
              placeholder="Enter delete reason"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={!deleteReason.trim()}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
