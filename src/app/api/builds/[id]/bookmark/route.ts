import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { bookmarks } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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

  const existing = await db
    .select()
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.buildId, buildId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.buildId, buildId)));
    return NextResponse.json({ bookmarked: false });
  } else {
    await db.insert(bookmarks).values({ userId: user.id, buildId });
    return NextResponse.json({ bookmarked: true });
  }
}
