// utils/buildFacilityFormData.ts
export function buildFacilityFormData(
    data: Record<string, any>,
    form?: FormData,
    parentKey?: string
  ): FormData {
    const fd = form ?? new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
  
      const fieldKey = parentKey ? `${parentKey}.${key}` : key;
  
      // File (img) – chỉ có ở level root
      if (value instanceof File) {
        fd.append(parentKey ?? key, value); // ví dụ "img"
        return;
      }
  
      // Array: operation_days, ...
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== null && item !== undefined) {
            fd.append(fieldKey, String(item));
          }
        });
        return;
      }
  
      // Object lồng – flatten tiếp
      if (typeof value === "object") {
        buildFacilityFormData(value, fd, fieldKey);
        return;
      }
  
      // number / string / boolean
      fd.append(fieldKey, String(value));
    });
  
    return fd;
  }
  