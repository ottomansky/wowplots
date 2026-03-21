import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSession(request.headers.get("cookie"));
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user });
}
