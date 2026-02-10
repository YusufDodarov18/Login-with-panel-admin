import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  if (
    token &&
    (url.pathname === "/login" || url.pathname === "/registration")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/registration"],
};
