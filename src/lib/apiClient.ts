// src/lib/apiClient.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// =======================
// 1. Tạo axios instance
// =======================
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  withCredentials: true, // Gửi và nhận cookie HttpOnly
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// =======================
// Biến cờ tránh refresh token chạy lặp
// =======================
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// Hàm thông báo cho các request khác chờ refresh xong
function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

// =======================
// Interceptor Request (tuỳ chọn)
// =======================
// Có thể thêm Bearer token vào header nếu BE yêu cầu.
// Với cookie HttpOnly thì KHÔNG cần.
// apiClient.interceptors.request.use((config) => {
//   // Example nếu BE yêu cầu header Authorization
//   // const token = localStorage.getItem("access_token");
//   // if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// =======================
// 2. Interceptor Response (tự động refresh token)
// =======================
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Nếu lỗi không phải 401 hoặc request chưazx config xong → bỏ qua
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Nếu là request /auth/refresh hoặc /auth/login hoặc /auth/verify-2fa → không retry
    const url = originalRequest.url || "";
    if (url.includes("/auth/refresh") || url.includes("/auth/login") || url.includes("/auth/verify-2fa")) {
      return Promise.reject(error);
    }

    // Nếu đã retry 1 lần rồi → tránh loop vô hạn
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // =========================
    // 3. Bắt đầu quy trình refresh
    // =========================
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        console.log("[apiClient] Access token expired → refreshing...");
        // Gọi refresh API (body rỗng, cookie refresh_token sẽ tự gửi kèm)
        const refreshResponse = await apiClient.post("/auth/refresh");
        console.log("[apiClient] Refresh success", refreshResponse.status);

        // Sau khi refresh thành công → đánh thức các request đang chờ
        onRefreshed();
      } catch (refreshError) {
        console.error("[apiClient] Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Nếu có request khác đến trong lúc đang refresh → đợi refresh xong
    await new Promise<void>((resolve) => refreshSubscribers.push(resolve));

    // Gắn cờ retry để tránh vòng lặp vô hạn
    originalRequest._retry = true;

    // Gửi lại request cũ
    return apiClient(originalRequest);
  }
);

// =======================
// Export instance
// =======================
export default apiClient;