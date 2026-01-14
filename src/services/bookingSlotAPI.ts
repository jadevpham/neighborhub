import apiClient from "@/lib/apiClient";
import {
  BookingSlotHistoryParam,
  BookingSlotHistoryResponse,
  BookingSlotListResponse,
  BookingSlotParam,
} from "@/types/bookingSlot";
export const booingSlotAPI = {
  // 1. API Get facilities/:id/booking-slots
  bookingSlotList: async (
    id: string, // id của facility chứ không phải id của booking slot
    params: BookingSlotParam
  ): Promise<BookingSlotListResponse> => {
    const response = await apiClient.get(`facilities/${id}/booking-slots`, {
      params,
    });
    return response.data;
  },

  // 2. API Get facilities/booking-slots/:id/history
  bookingSlotHistoryList: async (
    id: string, // id của booking slot
    params: BookingSlotHistoryParam
  ): Promise<BookingSlotHistoryResponse> => {
    const response = await apiClient.get(
      `facilities/booking-slots/${id}/history`,
      {
        params,
      }
    );
    return response.data;
  },
  
  // 3. API Post /facilities/:id/booking-slots (cho SA, MB) (Each request equal 1 slot)
};
