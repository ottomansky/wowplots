import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession, isAdmin } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSession(request.headers.get("cookie"));
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Admin required" }, { status: 403 });
  }

  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  await db.delete(comments).where(eq(comments.id, id));
  return NextResponse.json({ success: true });
}
