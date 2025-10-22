import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,        // 30s
        gcTime: 1000 * 60 * 5,       // 5 phút
        refetchOnWindowFocus: false, // tuỳ app
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
