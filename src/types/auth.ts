// dữ liệu gửi đi trong body request api Post/Put/Patch: payload
// dữ liệu gửi đi trong body request api Get: param
// dữ liệu trẩ về trong body response: data

// dữ liệu gửi đi trong body request api Post auth/login
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  requires_2fa: boolean;
  challenge_Id: string;
  otp_Delivery?: {
    channel: string;
    maskedAddress: string;
    expiresIn: number;
  };
}

// dữ liệu gửi đi trong body request api Post auth/verify-2fa
export interface Verify2FaPayload {
  challengeId: string;
  otp: string;
}

export interface UpdateProfilePayload {
  name?: string | null;
  phone?: string | null;
  avatar?: string | null;
  dob?: string | null;
  gender?: string | null;
  title?: string | null;
}