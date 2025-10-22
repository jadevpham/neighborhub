// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authAPI } from "@/services/authAPI";

export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // lưu user vào cache TanStack Query
      queryClient.setQueryData(["user"], data.user);
      router.push("/"); // điều hướng sang home
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      router.push("/login");
    },
  });
}

// Query profile (khi load lại trang)
export function useUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: authAPI.getProfile,
    retry: false, // nếu chưa login thì không retry liên tục
  });
}
// chỉ cần gọi const { data: user } = useAuthQuery() là bạn có user?.role để phân quyền ở các page, component khác