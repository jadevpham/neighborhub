// import { ModalPoupProps } from '@/types/common';
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
