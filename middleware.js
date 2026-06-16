import { NextResponse } from "next/server";

// Защищает все /admin/* страницы от неавторизованного доступа
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_session")?.value;
  const validToken = process.env.ADMIN_TOKEN || "cafe2024-secret-token";

  const isLoginPage = pathname === "/admin/login";
  const isAuthed = token === validToken;

  // Если не авторизован и не страница входа — редирект на логин
  if (!isAuthed && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Если авторизован и пытается зайти на страницу входа — редирект на дашборд
  if (isAuthed && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
