// Một service duy nhất dùng cho MỌI resource call api: deleteb user, site, zone, apartment, facility,....

import apiClient from "../lib/apiClient";
import { DeletePayload } from "@/types/common";

export const deleteResourceAPI = async ({
  resource,
  ids,
  residentId,
  apartmentIds,
}: DeletePayload) => {
  // ==============================
  // CASE 1: DELETE APARTMENT OF RESIDENT
  // ==============================
  if (resource === "residents" && residentId && apartmentIds?.length) {
    return apiClient.delete(`/residents/${residentId}`, {
      data: {
        apartment: apartmentIds.map((id) => ({ id })),
      },
    });
  }
  // ==============================
  // CASE 2: DELETE MULTIPLE
  // ==============================
  if (ids && ids.length > 1) {
    return apiClient.delete(`/${resource}`, {
      data: { ids },
    });
  }

  // ==============================
  // CASE 3: DELETE SINGLE
  // ==============================
  if (ids && ids.length === 1) {
    // delete single
    return apiClient.delete(`/${resource}/${ids[0]}`);
  }
  throw new Error("Invalid delete payload");
};
