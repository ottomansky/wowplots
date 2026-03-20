import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { createBuild, addBuildImage, ensureTag, tagBuild } from "@/lib/db/queries";
import { nanoid, slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);

    const body: {
      title?: string;
      description?: string;
      biome?: string;
      houseSize?: string;
      roomCount?: number;
      itemCount?: number;
      layoutCode?: string;
      tags?: string[];
      imageUrls?: string[];
    } = await request.json();

    const {
      title,
      description,
      biome,
      houseSize,
      roomCount,
      itemCount,
      layoutCode,
      tags,
      imageUrls,
    } = body;

    if (!title || !biome || !houseSize) {
      return NextResponse.json(
        { error: "Title, biome, and house size are required" },
        { status: 400 },
      );
    }

    const id = nanoid();
    const slug = slugify(title) + "-" + id.slice(0, 6);

    await createBuild(db, {
      id,
      slug,
      title,
      description,
      biome,
      houseSize,
      roomCount: roomCount || undefined,
      itemCount: itemCount || undefined,
      layoutCode: layoutCode || undefined,
      status: "published",
    });

    // Add images
    if (Array.isArray(imageUrls)) {
      for (let i = 0; i < imageUrls.length; i++) {
        await addBuildImage(db, {
          id: nanoid(),
          buildId: id,
          r2Key: imageUrls[i],
          sortOrder: i,
          isPrimary: i === 0,
        });
      }
    }

    // Add tags
    if (Array.isArray(tags)) {
      for (const tagName of tags) {
        const tagId = await ensureTag(db, tagName.toLowerCase(), "style");
        await tagBuild(db, id, tagId);
      }
    }

    return NextResponse.json({ id, slug });
  } catch (error) {
    console.error("Admin create build error:", error);
    return NextResponse.json(
      { error: "Failed to create build" },
      { status: 500 },
    );
  }
}
