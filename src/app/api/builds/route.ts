import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { getBuilds, type BuildSort } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const result = await getBuilds(
    db,
    {
      biome: params.get("biome") || undefined,
      houseSize: params.get("size") || undefined,
      tag: params.get("tag") || undefined,
    },
    (params.get("sort") as BuildSort) || "newest",
    params.get("cursor") || undefined,
    Number(params.get("limit")) || 8,
  );

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=60" },
  });
}
