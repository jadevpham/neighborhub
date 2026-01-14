// A. Hàm hỗ trợ FE hiển thị đúng kiểu ngày giờ mong muốn vì BE trả về date, date-time,
//  dạng chưa đẹp/chưa tách date và time, chưa chuyển về giờ local => hàm này sẽ hỗ trợ hiển thị đúng đẹp,
//  tách date và đúng giờ local chứ không phải giờ quốc tế
export function formatDate(dateString?: string | null) {
  if (!dateString) return "—";

  let date: Date | null = null;

  // ---- CASE 1: Format ISO chuẩn BE (2025-12-06T11:01:14.085242Z)
  if (!isNaN(Date.parse(dateString))) {
    date = new Date(dateString);
  }

  // ---- CASE 2: BE trả về dạng DD-MM-YYYYTHH:mm:ssZ
  // Ví dụ: 05-12-2025T19:14:11Z
  else {
    const match = dateString.match(
      /^(\d{2})-(\d{2})-(\d{4})T(\d{2}):(\d{2}):(\d{2})Z?$/
    );
    if (match) {
      const [, dd, mm, yyyy, HH, MM, SS] = match;
      date = new Date(
        Date.UTC(
          Number(yyyy),
          Number(mm) - 1,
          Number(dd),
          Number(HH),
          Number(MM),
          Number(SS)
        )
      );
    }
  }

  // Nếu parse thất bại -> trả về nguyên bản để tránh crash
  if (!date || isNaN(date.getTime())) return dateString;

  // Convert sang giờ local (JS tự convert UTC -> local)
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();

  const hh = date.getHours().toString().padStart(2, "0");
  const mi = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");

  return `${d}-${m}-${y} ${hh}:${mi}:${ss}`;
}

// B. Hàm hỗ trợ FE gửi date, date-time cho BE đúng format BE yêu cầu
// Helper: chuyển mọi kiểu input về Date
function parseToDate(input: string | Date | null | undefined): Date | null {
  if (!input) return null;

  if (input instanceof Date) return input;

  const trimmed = input.trim();

  // Case 1: "2025-01-05T08:30" (datetime-local)
  if (trimmed.includes("T")) {
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
  }

  // Case 2: "2025-01-05" (yyyy-MM-dd)
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
  }

  // Case 3: "05-01-2025" hoặc "05/01/2025" (dd-MM-yyyy / dd/MM/yyyy)
  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(trimmed)) {
    const [dd, mm, yyyy] = trimmed.replaceAll("/", "-").split("-");
    const d = new Date(`${yyyy}-${mm}-${dd}`);
    return isNaN(d.getTime()) ? null : d;
  }

  // Case 4: fallback, để JS tự parse
  const d = new Date(trimmed);
  return isNaN(d.getTime()) ? null : d;
}

// TH1: BE yêu cầu $date: dd-MM-yyyy
export function toBEDate(
  input: string | Date | null | undefined
): string | null {
  const dateObj = parseToDate(input);
  if (!dateObj) return null;

  const d = dateObj.getDate().toString().padStart(2, "0");
  const m = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const y = dateObj.getFullYear();

  // dd-MM-yyyy
  return `${d}-${m}-${y}`;
}

// TH2: BE yêu cầu $date-time, có chuyển từ local time sang UTC
export function toBEDateTimeLocal(value: string | null | undefined) {
  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date.getTime())) return null;

  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();

  const HH = date.getHours().toString().padStart(2, "0");
  const MM = date.getMinutes().toString().padStart(2, "0");
  const SS = date.getSeconds().toString().padStart(2, "0");

  // timezone tự động theo máy user
  const offsetMinutes = date.getTimezoneOffset();
  const abs = Math.abs(offsetMinutes);

  const offsetHours = Math.floor(abs / 60)
    .toString()
    .padStart(2, "0");
  const offsetMins = (abs % 60).toString().padStart(2, "0");
  const sign = offsetMinutes <= 0 ? "+" : "-";
  // Lưu ý: getTimezoneOffset() trả số âm khi user ở GMT+ (VN: -420)

  const timezone = `${sign}${offsetHours}:${offsetMins}`;

  // Format BE yêu cầu:
  return `${dd}-${mm}-${yyyy}T${HH}:${MM}:${SS}${timezone}`;
}

// Hàm tạm thời cho buildCreateUserForm, khi nào fix đc thì có thể dùng chung hàm toBEDateTimeLocal hoặc toBEDate
// khi nào fix được create user thì xóa
export function formatDob(isoDate: string): string {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
