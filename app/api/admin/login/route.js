import { NextResponse } from "next/server";

export async function POST(request) {
  const { login, password } = await request.json();

  const validLogin = process.env.ADMIN_LOGIN || "admin";
  const validPassword = process.env.ADMIN_PASSWORD || "cafe2024";
  const token = process.env.ADMIN_TOKEN || "cafe2024-secret-token";

  if (login === validLogin && password === validPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 часов
    });
    return res;
  }

  return NextResponse.json(
    { ok: false, message: "Неверный логин или пароль" },
    { status: 401 }
  );
}