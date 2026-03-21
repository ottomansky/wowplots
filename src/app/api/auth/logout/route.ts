import { NextResponse } from "next/server";
import { clearSessionCookieHeader } from "@/lib/auth";
import { SITE_URL } from "@/lib/constants";

export async function GET() {
  const response = NextResponse.redirect(`${SITE_URL}/`);
  response.headers.append("Set-Cookie", clearSessionCookieHeader());
  return response;
}
