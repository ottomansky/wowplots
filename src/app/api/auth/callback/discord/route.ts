import { NextRequest, NextResponse } from "next/server";
import {
  getDiscord,
  upsertUser,
  createSessionCookie,
  sessionCookieHeader,
} from "@/lib/auth";
import { SITE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(`${SITE_URL}/?error=missing_params`);
  }

  // Verify state matches cookie
  const storedState = request.cookies.get("oauth_state")?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(`${SITE_URL}/?error=invalid_state`);
  }

  // Extract return URL from state
  let returnUrl = "/";
  try {
    const parts = state.split(":");
    if (parts.length > 1) {
      returnUrl = atob(parts[parts.length - 1]);
    }
  } catch {
    returnUrl = "/";
  }

  try {
    const discord = getDiscord();
    const tokens = await discord.validateAuthorizationCode(code, null);
    const accessToken = tokens.accessToken();

    // Fetch Discord user profile
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${SITE_URL}/?error=discord_api`);
    }

    const discordUser: {
      id: string;
      username: string;
      global_name?: string;
      avatar?: string;
    } = await userRes.json();

    // Upsert user in D1
    const user = await upsertUser(discordUser);

    // Create session cookie
    const cookieValue = await createSessionCookie(user);

    const response = NextResponse.redirect(`${SITE_URL}${returnUrl}`);
    response.headers.append("Set-Cookie", sessionCookieHeader(cookieValue));
    // Clear the OAuth state cookie
    response.headers.append(
      "Set-Cookie",
      "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    );
    return response;
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(`${SITE_URL}/?error=auth_failed`);
  }
}
