import { NextRequest, NextResponse } from "next/server";
import { generateState } from "arctic";
import { getDiscord } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const discord = getDiscord();
  const state = generateState();

  // Store the return URL in the state (encoded)
  const returnUrl = request.nextUrl.searchParams.get("return") || "/";
  const stateWithReturn = `${state}:${btoa(returnUrl)}`;

  const url = discord.createAuthorizationURL(stateWithReturn, null, ["identify"]);

  const response = NextResponse.redirect(url);
  // Store state in a cookie for verification
  response.headers.append(
    "Set-Cookie",
    `oauth_state=${stateWithReturn}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  );
  return response;
}
