"use client"; // Bắt buộc: QueryProvider là client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  // Tạo 1 instance QueryClient (quản lý cache, refetch, retries...)
  // Dùng useState để tránh tạo lại QueryClient mỗi lần render
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Bọc toàn bộ component con trong QueryClientProvider
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
