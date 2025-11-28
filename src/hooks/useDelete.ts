// Một hook duy nhất dùng cho MỌI resource: deleteb user, site, zone, apartment, facility,....
import { useMutation } from "@tanstack/react-query";
import { deleteResourceAPI } from "@/services/deleteResourceAPI";

export const useDeleteResource = () => {
  return useMutation({
    mutationFn: deleteResourceAPI,
  });
};
