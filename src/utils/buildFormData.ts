// Dùng chung cho tất cả loại API yêu cầu body request là form-data

export function buildFormData(data: Record<string, any>) {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    // Nếu là array (File[], string[], ...)
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          fd.append(key, item);
        }
      });
    }
    // Nếu là số → convert sang string
    else if (typeof value === "number") {
      fd.append(key, String(value));
    }
    // Nếu là object (date, object, ...) → convert sang JSON string
    else if (value instanceof Date) {
      fd.append(key, value.toISOString());
    }
    // File hoặc string
    else {
      fd.append(key, value);
    }
  });

  return fd;
}
