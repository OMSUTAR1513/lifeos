import { NextResponse } from "next/server";
import { logoutSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    await logoutSession(token);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Logout failed." }, { status: 400 });
  }
}
