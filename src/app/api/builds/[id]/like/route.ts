import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { likes, builds } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSession(request.headers.get("cookie"));
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { id: buildId } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  // Check if already liked
  const existing = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, user.id), eq(likes.buildId, buildId)))
    .limit(1);

  if (existing.length > 0) {
    // Unlike
    await db
      .delete(likes)
      .where(and(eq(likes.userId, user.id), eq(likes.buildId, buildId)));
    await db
      .update(builds)
      .set({ likeCount: sql`${builds.likeCount} - 1` })
      .where(eq(builds.id, buildId));

    const updated = await db.select({ likeCount: builds.likeCount }).from(builds).where(eq(builds.id, buildId)).limit(1);
    return NextResponse.json({ liked: false, count: updated[0]?.likeCount ?? 0 });
  } else {
    // Like
    await db.insert(likes).values({ userId: user.id, buildId });
    await db
      .update(builds)
      .set({ likeCount: sql`${builds.likeCount} + 1` })
      .where(eq(builds.id, buildId));

    const updated = await db.select({ likeCount: builds.likeCount }).from(builds).where(eq(builds.id, buildId)).limit(1);
    return NextResponse.json({ liked: true, count: updated[0]?.likeCount ?? 0 });
  }
}
