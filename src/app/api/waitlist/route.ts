import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
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

    await db.insert(waitlist).values({ id: nanoid(), email });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Handle duplicate email
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { error: "This email is already on the waitlist!" },
        { status: 409 },
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
