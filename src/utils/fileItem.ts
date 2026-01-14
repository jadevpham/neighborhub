export function formatFileSize(size?: string | null) {
  if (!size) return "-";
  const kb = Number(size) / 1024;
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

export function getExt(name?: string | null) {
  return name?.split(".").pop()?.toUpperCase() ?? "FILE";
}
