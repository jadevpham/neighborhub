// Một service duy nhất dùng cho MỌI resource call api: deleteb user, site, zone, apartment, facility,....

import apiClient from "../lib/apiClient";
import { DeletePayload } from "@/types/common";

export const deleteResourceAPI = async ({ resource, ids }: DeletePayload) => {
  if (ids.length === 1) {
    // delete single
    return apiClient.delete(`/${resource}/${ids[0]}`);
  }

  // delete many
  return apiClient.delete(`/${resource}`, {
    data: { ids }, // BE nhận body { ids: [...] }
  });
};