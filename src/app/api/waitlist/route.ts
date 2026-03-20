import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { eq } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { waitlist } from "@/db/schema";
import { nanoid } from "@/lib/utils";

const schema = z.object({
  email: z.email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    const { env } = getCloudflareContext();
    const db = getDb(env.DB);

    // Check if already on waitlist
    const existing = await db
      .select({ id: waitlist.id })
      .from(waitlist)
      .where(eq(waitlist.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "This email is already on the waitlist!" },
        { status: 409 },
      );
    }

    await db.insert(waitlist).values({ id: nanoid(), email });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
