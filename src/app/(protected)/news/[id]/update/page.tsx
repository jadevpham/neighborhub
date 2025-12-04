"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import NewsForm from "../../components/NewsForm";
import { useUpdateNewsMutation, useNewsDetailQuery } from "@/hooks/useNews";
import { toast } from "sonner";
import { useParams } from "next/navigation";
export default function UpdateNewsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { data, isLoading } = useNewsDetailQuery(id);
  const mutation = useUpdateNewsMutation();

  const news = data?.data;

  return (
    <>
      <PageHeader
        title="News Management — Update News"
        subtitle="Edit and republish the existing article."
        showBack
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <NewsForm
          initialData={news}
          submitting={mutation.isPending}
          onSubmit={(payload) => {
            mutation.mutate(
              { id, payload },
              {
                onSuccess: () => {
                  toast.success("News updated successfully!");
                  router.push(`/news/${id}`);
                },
              }
            );
          }}
          onCancel={() => router.push(`/news/${id}`)}
        />
      )}
    </>
  );
}
