// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Kiểu cho request body
interface LoginBody {
  username: string;
  password: string;
}

// API POST /api/auth/login
export async function POST(req: Request) {
  const body: LoginBody = await req.json();
  const { username, password } = body;

  // Kiểm tra biến môi trường JWT
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessSecret || !refreshSecret) {
    return NextResponse.json(
      { message: "JWT secrets are not defined in environment variables" },
      { status: 500 }
    );
  }

  // Check credentials (demo: hardcoded)
  if (username === "admin" && password === "1") {
    try {
      // Tạo JWT token
      const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: "7d" });

      // Tạo response JSON
      const res = NextResponse.json({
        message: "Login success",
        user: { username, role: "Admin" },
      });

      // Set cookie cho access token
      res.cookies.set("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 phút
        secure: process.env.NODE_ENV === "production",
      });

      // Set cookie cho refresh token
      res.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 ngày
        secure: process.env.NODE_ENV === "production",
      });

      return res;
    } catch (error) {
      return NextResponse.json(
        { message: "An error occurred while generating tokens" },
        { status: 500 }
      );
    }
  }

  // Invalid credentials
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
