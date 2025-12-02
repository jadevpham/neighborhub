export function formatDate(dateString?: string | null) {
  if (!dateString) return "—";
  return dateString.replace("T", " ").replace("Z", "");
}

export function formatDobForBE(input: string | Date | null | undefined) {
  if (!input) return "";

  // input là Date
  if (input instanceof Date) {
    const d = input.getDate().toString().padStart(2, "0");
    const m = (input.getMonth() + 1).toString().padStart(2, "0");
    const y = input.getFullYear();
    return `${d}-${m}-${y}`;
  }
  // input là string "yyyy-MM-dd"
  const [yyyy, mm, dd] = input.split("-");
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
