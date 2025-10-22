import { apiClient } from '@/lib/apiClient';

export const authAPI = {
  // Gửi username, password đến BE thông qua API POST
  login: async (data: { username: string; password: string }) => {
    try {
      const response = await apiClient.post("/auth/login", data, {
        withCredentials: true, // Quan trọng: gửi và nhận cookie httpOnly
      });
      return response.data; // BE trả về thông tin user, không cần token vì cookie đã lưu trong trình duyệt
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error("Login error:", error);
      throw error; // Ném lỗi ra ngoài để có thể xử lý ở component nếu cần
    }
  },

  // Gửi request logout tới server
  logout: async () => {
    try {
      const response = await apiClient.post("/auth/logout", {}, {
        withCredentials: true, // Gửi cookies
      });
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Lấy thông tin profile của người dùng sau khi đăng nhập
  getProfile: async () => {
    try {
      const response = await apiClient.get("/auth/me", { withCredentials: true });
      return response.data;  // { id, name, username, role }
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },
};
