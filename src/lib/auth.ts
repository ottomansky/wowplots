import { Discord } from "arctic";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

// ─── Session Types ──────────────────────────────────────

export interface SessionUser {
  id: string;
  discordId: string;
  username: string;
  avatarUrl: string | null;
  role: string;
}

// ─── Discord OAuth Client ───────────────────────────────

export function getDiscord() {
  const { env } = getCloudflareContext();
  return new Discord(
    env.DISCORD_CLIENT_ID,
    env.DISCORD_CLIENT_SECRET,
    `${SITE_URL}/api/auth/callback/discord`,
  );
}

// ─── Session Cookie ─────────────────────────────────────

const SESSION_COOKIE = "wowplots_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Encode a session payload into a signed cookie value.
 * Uses HMAC-SHA256 with SESSION_SECRET for integrity.
 */
export async function createSessionCookie(user: SessionUser): Promise<string> {
  const { env } = getCloudflareContext();
  const payload = JSON.stringify(user);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(env.SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const data = btoa(payload);
  return `${data}.${sig}`;
}

/**
 * Verify and decode a session cookie value.
 */
export async function verifySessionCookie(
  cookie: string,
): Promise<SessionUser | null> {
  try {
    const { env } = getCloudflareContext();
    const [data, sig] = cookie.split(".");
    if (!data || !sig) return null;

    const payload = atob(data);
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(env.SESSION_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const sigBytes = Uint8Array.from(atob(sig), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(payload),
    );
    if (!valid) return null;

    return JSON.parse(payload) as SessionUser;
  } catch {
    return null;
  }
}

/**
 * Get session cookie header string for Set-Cookie.
 */
export function sessionCookieHeader(value: string, maxAge = SESSION_MAX_AGE): string {
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

/**
 * Get clear-session cookie header.
 */
export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

// ─── Get Current User ───────────────────────────────────

/**
 * Read the session from the request cookies.
 * Works in Server Components, API routes, and middleware.
 */
export async function getSession(cookieHeader: string | null): Promise<SessionUser | null> {
  if (!cookieHeader) return null;

  // Parse cookies manually (no dependency needed)
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...rest] = c.trim().split("=");
      return [key, rest.join("=")];
    }),
  );

  const sessionValue = cookies[SESSION_COOKIE];
  if (!sessionValue) return null;

  return verifySessionCookie(sessionValue);
}

// ─── User Upsert ────────────────────────────────────────

export async function upsertUser(discordUser: {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
}): Promise<SessionUser> {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const avatarUrl = discordUser.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=256`
    : null;

  const displayName = discordUser.global_name || discordUser.username;

  // Check if user exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.discordId, discordUser.id))
    .limit(1);

  if (existing.length > 0) {
    // Update avatar and username on re-login
    await db
      .update(users)
      .set({ username: displayName, avatarUrl })
      .where(eq(users.id, existing[0].id));

    return {
      id: existing[0].id,
      discordId: existing[0].discordId,
      username: displayName,
      avatarUrl,
      role: existing[0].role,
    };
  }

  // Check if this Discord ID is an admin
  const adminIds = (env.ADMIN_DISCORD_IDS || "").split(",").map((s: string) => s.trim());
  const isAdmin = adminIds.includes(discordUser.id);

  const id = nanoid();
  await db.insert(users).values({
    id,
    discordId: discordUser.id,
    username: displayName,
    avatarUrl,
    role: isAdmin ? "admin" : "user",
  });

  return {
    id,
    discordId: discordUser.id,
    username: displayName,
    avatarUrl,
    role: isAdmin ? "admin" : "user",
  };
}

// ─── Admin Check ────────────────────────────────────────

export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === "admin";
}
