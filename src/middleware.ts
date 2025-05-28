// /src/middleware.ts

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // ตรวจสอบ NEXTAUTH_SECRET ก่อน
  if (!process.env.NEXTAUTH_SECRET) {
    console.warn("⚠️ NEXTAUTH_SECRET is not set");
  }

  // ดึง token จาก cookie (JWT) ด้วย NEXTAUTH_SECRET
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("🔐 token in middleware:", token);

  const url = req.nextUrl.clone();

  // ถ้าเข้า path ที่ต้องการสิทธิ์ admin
  if (url.pathname.startsWith("/admin")) {
    // ถ้าไม่มี token หรือ role ไม่ใช่ admin
    if (!token || token.role !== "admin") {
      // redirect ไปหน้า 403
      url.pathname = "/403";
      return NextResponse.redirect(url);
    }
  }

  // ถ้าผ่านเกณฑ์ทุกอย่าง ให้ไปหน้าที่ขอ
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],

  // ใช้ Node runtime ช่วย middleware อ่าน cookie ได้ดีขึ้น
  runtime: "nodejs",
};
