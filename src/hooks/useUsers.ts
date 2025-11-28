import { userAPI } from "@/services/userAPI";
import { MetaProps } from "@/types/common";
import { User, UserResponse, UsersResponse } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 1. Hook dùng cho API Get /users 
export function useUsersQuery(params: MetaProps) {
  return useQuery<UsersResponse>({
    queryKey: ["users", params],
    queryFn: () => userAPI.users(params),
    placeholderData: (previousData) => previousData,
  });
}

// 2. Hook dùng cho API Get /users/:id
export const useUserQuery = (id: string) => {
  return useQuery<UserResponse>({
    queryKey: ["user", id],
    queryFn: () => userAPI.user(id),
    enabled: !!id,
  });
};

// 3. Hook dùng cho API Post /users
export const useUserMutationCreate = () =>
  useMutation<any, AxiosError, FormData>({
    mutationFn: (payload) => userAPI.createUser(payload),
  });

// 4. Hook dùng cho API Patch /users/:id
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: userAPI.updateUser,
  });
};

// 5. Hook dùng cho API Delete /users/:id
// Không có useUserMutationDelete vì đã có hook useDelete dùng chung cho tất cả api rồi