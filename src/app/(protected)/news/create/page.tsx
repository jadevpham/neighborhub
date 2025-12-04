"use client";

import React, { useState } from "react";
import { useCreateNewsMutation } from "@/hooks/useNews";
import { NewsPayload } from "@/types/news";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { toBEDateTimeLocal } from "@/utils/formatDate";
import NewsForm from "../components/NewsForm";

export default function CreateNewsPage() {
  const router = useRouter();
  const createNewsMutation = useCreateNewsMutation();
  return (
    <>
      <PageHeader
        title="News Management — Create News"
        subtitle="Compose and publish a new announcement for your community."
        showBack={true}
      />
      {/* ===== FORM ===== */}
      <NewsForm
        onSubmit={(payload) => {
          createNewsMutation.mutate(payload, {
            onSuccess: () => {
              toast.success("News created successfully!");
              router.push("/news");
            },
          });
        }}
        submitting={createNewsMutation.isPending}
        onCancel={() => router.push("/news")}
      />
    </>
  );
}
