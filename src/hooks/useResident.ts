import { residentAPI } from "@/services/residentAPI";
import { ResidentParam } from "@/types/resident";
import {
  ResidentResponse,
  ResidentsResponse,
} from "@/types/resident";
import { useMutation, useQuery } from "@tanstack/react-query";

// 1. Hook dùng cho API Get /residents
export function useResidentsQuery(params: ResidentParam) {
  return useQuery<ResidentsResponse>({
    queryKey: ["residents", params],
    queryFn: () => residentAPI.residents(params),
    placeholderData: (prev) => prev,
  });
}

// 2. Hook dùng cho API Get /residents/:id
export const useResidentQuery = (id: string) => {
  return useQuery<ResidentResponse>({
    queryKey: ["resident", id],
    queryFn: () => residentAPI.resident(id),
    enabled: !!id,
  });
};

// 3. Hook dùng cho API Patch /residents/:id
export const useResidentMutationUpdate = () => {
  return useMutation({
    mutationFn: residentAPI.updateResident,
  });
};

// 4. Hook dùng cho API Delete /residents/:id
// Không có useResidentMutationDelete vì đã có hook useDeleteResource