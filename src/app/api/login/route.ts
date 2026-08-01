import { NextResponse } from "next/server";
import { loginUser, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const result = await loginUser(email, password);

    if (!result) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await setSessionCookie(result.token);

    return NextResponse.json({ user: result.user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 400 });
  }
}
