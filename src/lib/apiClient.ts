// Nơi cấu hình axios instance toàn cục
import axios from "axios";
console.log("API base URL:", process.env.NEXT_PUBLIC_API_URL);
const baseURL =
  process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_API_URL
    : "/api";
export const apiClient = axios.create({
  baseURL,
  withCredentials: true, // để cookie HttpOnly được gửi kèm
  headers: { "Content-Type": "application/json" },
});
console.log("API base URL:", baseURL);
// Biến để tránh loop refresh vô hạn
let isRefreshing = false;

// Hàng chờ request nếu có nhiều request bị 401 cùng lúc
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Interceptor xử lý lỗi 401 (token hết hạn)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi refresh token API
        await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        processQueue(null);
        return apiClient(originalRequest); // Retry request cũ
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);