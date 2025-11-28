// Nơi call API, không call API trực tiếp trong component
import { UsersResponse, UserResponse, UpdateUserPayload } from "@/types/user";
import { MetaProps } from "@/types/common";
import apiClient from "../lib/apiClient";

export const userAPI = {
  // 1. API Get /users
  users: async (params: MetaProps): Promise<UsersResponse> => {
    const response = await apiClient.get("/users", { params });
    return response.data;
  },

  // 2. API Get /users/:id
  user: async (id: string): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>(`/users/${id}`);
    return response.data;
  },

  // 3. API Post /users
  createUser: async (formData: FormData) => {
    const response = await apiClient.post("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // { message: "User created successfully" }
  },

  // 4. API Patch /users/:id
  updateUser: async ({ id, payload }: { id: string; payload: UpdateUserPayload }) => {
    const response = await apiClient.patch(`/users/${id}`, payload);
    return response.data;
  },

  // 5. API Delete /users/:id
  // Không cần call API Delete riêng lẻ cho user nữa mà dùng chung deleteResourceAPI cho mọi call api delete: user, site, zone, apartment, facility,...s
};