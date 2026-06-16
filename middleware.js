import { NextResponse } from "next/server";

// Защищает все /admin/* страницы от неавторизованного доступа
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_session")?.value;
  const validToken = process.env.ADMIN_TOKEN || "cafe2024-secret-token";

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";
  const isAuthed = token === validToken;

  // Страница входа всегда доступна
  if (isLoginPage) {
    // Если авторизован и пытается зайти на страницу входа — редирект на дашборд
    if (isAuthed) {
      const url = new URL("/admin", request.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Если не авторизован и не страница входа — редирект на логин
  if (!isAuthed) {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
