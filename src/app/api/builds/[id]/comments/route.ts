import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { comments, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { nanoid } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: buildId } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const rows = await db
    .select({
      id: comments.id,
      body: comments.body,
      createdAt: comments.createdAt,
      userId: users.id,
      username: users.username,
      avatarUrl: users.avatarUrl,
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.buildId, buildId))
    .orderBy(desc(comments.createdAt))
    .limit(50);

  return NextResponse.json({ comments: rows });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSession(request.headers.get("cookie"));
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { id: buildId } = await params;
  const body: { body?: string } = await request.json();
  const text = body.body?.trim();

  if (!text || text.length === 0) {
    return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  }
  if (text.length > 1000) {
    return NextResponse.json({ error: "Comment too long (max 1000 chars)" }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const id = nanoid();
  await db.insert(comments).values({
    id,
    buildId,
    userId: user.id,
    body: text,
  });

  return NextResponse.json({
    comment: {
      id,
      body: text,
      createdAt: new Date().toISOString(),
      userId: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
    },
  });
}
