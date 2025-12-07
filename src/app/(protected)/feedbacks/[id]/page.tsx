"use client";

import { useParams } from "next/navigation";
import { useFeedbackDetailQuery } from "@/hooks/useFeedback";
import UpdateFeedbackForm from "../components/UpdateFeedbackForm";
import FeedbackMeta from "../components/FeedbackMeta";
import FeedbackManagement from "../components/FeedbackManagement";
import FeedbackActivityLog from "../components/FeedbackActivityLog";
import FeedbackContent from "../components/FeedbackContent";
import FeedbackAttachments from "../components/FeedbackAttachments";
import FeedbackResponses from "../components/FeedbackResponses";
import FeedbackResponseForm from "../components/FeedbackResponseForm";
import PageHeader from "@/components/PageHeader";
export default function FeedbackDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useFeedbackDetailQuery(id as string);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>Feedback not found</p>;

  const fb = data.data;

  return (
    <>
      <PageHeader
        title="FeedBack Management - Feedback Detail"
        subtitle="View and manage all user feedback."
        showBack={true}
      />
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-3 space-y-6">
          <FeedbackMeta fb={fb} />
          <FeedbackManagement fb={fb} />
          <FeedbackActivityLog fb={fb} />
          <UpdateFeedbackForm feedback={data.data} />
        </div>

        {/* RIGHT */}
        <div className="col-span-9 space-y-6">
          <FeedbackContent fb={fb} />
          <FeedbackAttachments attachments={fb.attachments} />
          <div className="bg-white/40 p-5 rounded-2xl shadow-2xl border">
            <h3 className="text-lg font-semibold mb-4 text-emerald-800">Responses</h3>
            <FeedbackResponses responses={fb.responses} />
            <FeedbackResponseForm feedbackId={id as string} />
          </div>
        </div>
      </div>
    </>
  );
}
