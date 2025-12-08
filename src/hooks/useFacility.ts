import {
  FacilityParam,
  FacilityListResponse,
  FacilityTypeListResponse,
  FacilityData,
  FacilityTypeData,
  FacilityTypePayload,
  FacilityFormValues,
} from "@/types/facility";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { facilityAPI } from "@/services/facilityAPI";
import { toast } from "sonner";
// 1. Hook dùng cho API Get /facilities
export function useFacilityListQuery(params: FacilityParam) {
  return useQuery<FacilityListResponse>({
    queryKey: ["facilityList", params],
    queryFn: () => facilityAPI.facilityList(params),
    placeholderData: (prev) => prev,
  });
}

// 2. Hook dùng cho API Get /facility-types
export function useFacilityTypeListQuery() {
  return useQuery<FacilityTypeListResponse>({
    queryKey: ["facilityTypeList"],
    queryFn: () => facilityAPI.facilityTypeList(),
    placeholderData: (prev) => prev,
  });
}

// 3. Hook dùng cho API Get /facilities/:id

// 4. Hook dùng cho API Get /facility-types/:id
export function useFacilityTypeDetailQuery(id: string | null) {
  return useQuery({
    queryKey: ["facilityTypeDetail", id],
    queryFn: () => facilityAPI.facilityTypeDetail(id!),
    enabled: !!id, // chỉ chạy nếu có id
  });
}

// 5. Hook dùng cho API Post /facilities
export function useCreateFacilityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: FacilityFormValues  }) =>
      facilityAPI.createFacility(payload),

    onSuccess: () => {
      toast.success("Facility created successfully!");
      queryClient.invalidateQueries({ queryKey: ["FacilityDetail"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create facility");
    },
  });
}

// 6. Hook dùng cho API Post /facility-types
export function useCreateFacilityTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    FacilityTypeData, // return type
    any, // error type
    { name: string } // input payload
  >({
    mutationFn: (payload) => facilityAPI.createFacilityType(payload),
    onSuccess: (newType) => {
      toast.success("Facility Type create successfully!");
      // Append vào danh sách facility types
      queryClient.setQueryData(["facilityTypeList"], (oldData: any) => {
        if (!oldData) {
          return { data: [newType] };
        }

        return {
          data: [...oldData.data, newType],
        };
      });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to create facility type"
      );
    },
  });
}

// 7. Hook dùng cho API Patch /facilities/:id

// 8. Hook dùng cho API Patch /facility-types/:id
export function useUpdateFacilityTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    FacilityTypeData, // return type
    any, // error type
    FacilityTypePayload // payload type
  >({
    mutationFn: ({ id, name }) => facilityAPI.updateFacilityType(id, { name }),

    onSuccess: (updatedType) => {
      toast.success("Facility Type updated successfully!");

      // Update item trong cache facilityTypeList
      queryClient.setQueryData(["facilityTypeList"], (oldData: any) => {
        if (!oldData) return { data: [updatedType] };

        return {
          data: oldData.data.map((item: FacilityTypeData) =>
            item.id === updatedType.id ? updatedType : item
          ),
        };
      });

      // Update cache detail nếu panel đang mở
      queryClient.setQueryData(
        ["facilityTypeDetail", updatedType.id],
        updatedType
      );
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to update facility type"
      );
    },
  });
}

// 9. Hook dùng cho API Delete /facilities/:id

// 10. Hook dùng cho API Delete /facility-types/:id
// Không cần hook Delete riêng lẻ cho facility-types nữa mà dùng chung hook useDeleteResource
