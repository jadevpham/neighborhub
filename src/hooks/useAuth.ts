// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authAPI } from "@/services/authAPI";

export function useLoginMutation() {
  return useMutation({
    mutationFn: authAPI.login,
  });
}

export function useVerify2FAMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: authAPI.verify2fa,
  })
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      window.location.href = "/";
    },
    onError: (error: any) => {
      console.error("Logout failed:", error);
      alert("Đăng xuất thất bại. Vui lòng thử lại!");
    },
  });
}

// Query profile (khi load lại trang/vào page profile)
export function useMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authAPI.getProfile,
    retry: false, // nếu chưa login thì không retry liên tục
  });
}
// chỉ cần gọi const { data } = useAuthQuery() là bạn có user?.role để phân quyền ở các page, component khác

// Update Profile
export function useMeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authAPI.updateProfile,
    // Tự refetch lại info của my profile sau khi update. Nếu có realtime thì không cần
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}