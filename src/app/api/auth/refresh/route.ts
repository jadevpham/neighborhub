import { NextResponse } from "next/server";

export async function POST() {
  try {
    const newAccessToken = "new-access-" + Date.now();

    // Tạo đối tượng Response trả về dưới dạng JSON
    const res = NextResponse.json({ message: "Token refreshed" });

    // Thiết lập cookie access với các tùy chọn bảo mật
    res.cookies.set("access", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,  // 15 minutes
    });

    return res;
  } catch (error) {
    // Xử lý lỗi nếu có
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  }
}
