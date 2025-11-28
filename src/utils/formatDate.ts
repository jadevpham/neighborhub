export function formatDate(dateString?: string | null) {
  if (!dateString) return "—";
  return dateString.replace("T", " ").replace("Z", "");
}

export function formatDobForBE(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`; // dd-MM-yyyy
}
export function formatDob(isoDate: string): string {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
