import apiClient  from '../lib/apiClient';

export const authAPI = {
  // Gửi email, password đến BE thông qua API POST
  login: async (data: { email: string; password: string }) => {
    const res = await apiClient.post("/auth/login", data);
    return res.data; // { requires_2fa, challenge_id }
  },

  verify2fa: async (payload: { challengeId: string; otp: string }) => {
    const res = await apiClient.post("/auth/verify-2fa", payload);
    return res.data; // { user }
  },

  // Lấy thông tin profile của người dùng sau khi đăng nhập
  getProfile: async () => {
      const response = await apiClient.get("/auth/me");
      return response.data;  
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
};
