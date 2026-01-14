import { BookingSlotHistoryParam, BookingSlotParam } from "@/types/bookingSlot";
import { booingSlotAPI } from "@/services/bookingSlotAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export function useBookingSlots(id: string, params: BookingSlotParam) {
  return useQuery({
    queryKey: ["booking-slots", id, params],
    queryFn: async () => {
      const res = await booingSlotAPI.bookingSlotList(id, params);
      return res.data ?? [];
    },
    enabled: !!id,
  });
}

export function useBookingSlotHistory(
  id: string,
  params: BookingSlotHistoryParam
) {
  return useQuery({
    queryKey: ["booking-slot-history", id, params],
    queryFn: async () => {
      const res = await booingSlotAPI.bookingSlotHistoryList(id, params);
      return res.data ?? [];
    },
    enabled: !!id,
  });
}
