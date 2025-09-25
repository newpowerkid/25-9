import { getSessionCookie } from "better-auth/cookies";
import type { Route } from "next";
import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import routing from "./i18n/routing";

const LOGIN_URL: Route = "/auth/login";

// สร้าง next-intl middleware ก่อน
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1) เรียก next-intl ก่อน เพื่อจัดการ locale routing
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  // 2) ตรวจ session
  const sessionCookie = getSessionCookie(request);

  // ถ้าไม่มี session → redirect ไป login
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/private")) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  return NextResponse.next();
}

// กำหนด matcher รวมทั้ง /private และเส้นทางที่ next-intl ใช้
export const config = {
  matcher: ["/", "/(th|en)/:path*", "/private/:path*"],
};
