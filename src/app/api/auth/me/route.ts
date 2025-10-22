import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  const access = cookieHeader?.match(/access=([^;]+)/)?.[1];

  if (!access) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: 1, username: "admin", role: "Admin" },
  });
}
