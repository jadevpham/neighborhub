import { UpdateProfilePayload } from "./auth";
export interface OtpInputProps {
  otp: string;
  setOtp: (v: string) => void;
  handleVerify: (e: React.FormEvent) => void;
  isPending: boolean;
}

export interface AppLogoProps {
  size?: number; // kích thước icon 🌿
  withText?: boolean; // có hiển thị chữ NeighborHub không
  href?: string; // có thể click để về trang chủ / dashboard
  circleSize?: number; // kích thước vòng tròn ngoài
}

export interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

export interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: UpdateProfilePayload;
}

// phần Parameter gửi đi và meta Response trả vê của các API get all list -> phân trang
export interface MetaProps {
  page: number;
  limit: number;
  total?: number; // optional, chỉ có ở Response, lúc gửi param không có trường dữ liệu này
}
export interface PaginationProps {
  meta: MetaProps;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface DeletePayload {
  resource: string; // "users" | "apartments" | "sites" | ...
  ids?: string[];    // dùng cho delete nhiều
  residentId?: string;  // dùng cho delete apartment của resident
  apartmentIds?: string[]; // dùng cho delete apartment của resident
}
export interface DeleteButtonProps {
  ids: Array<string> | string; // nhận 1 id hoặc nhiều id
  resourceName?: string; // tên resource để hiện confirm (optional)
  onDeleted?: () => void; // callback sau khi xóa (optional)
}

export interface BadgeProps {
  // for Status Badge
  status: number;
  map: Record<number, { label: string; color: string }>;
}

export interface StatusSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /** enum để dùng: "user" | "resident" */
  type: "user" | "resident";

  /** optional: lọc subset */
  allowedStatuses?: number[];
}

export interface ConfirmOptions {
  title?: string;
  message?: string;
  showInput?: boolean; // dùng cho reject
  inputLabel?: string;
  inputPlaceholder?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (inputValue?: string) => void;
}

export interface ConfirmContextType {
  openConfirm: (options: ConfirmOptions) => void;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  actions?: React.ReactNode; // nút bên phải
  className?: string;
}

export interface BackButtonProps {
  label?: string;                  // text bên cạnh icon
  variant?: "default" | "ghost" | "pill";  
  iconSize?: number;
  className?: string;              // custom thêm class
}
