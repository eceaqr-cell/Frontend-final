import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()


  const validEmail = "chheannyc@gmail.com"
  const validPassword = "123456"

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json(
      { message: "Incorrect email or password" },
      { status: 401 }
    )
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set("session", "demo-session-token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
