import type { Metadata } from "next";
import { Suspense } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { getBuilds, searchBuilds, type BuildSort } from "@/lib/db/queries";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GallerySearch } from "@/components/gallery/gallery-search";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Gallery — Browse WoW Housing Builds",
  description:
    "Browse the best World of Warcraft player housing builds. Filter by biome, house size, and style. Get inspired for your own WoW home.",
};

// Force dynamic rendering since we read from D1
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    biome?: string;
    size?: string;
    tag?: string;
    sort?: string;
    cursor?: string;
    q?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: Props) {
  const params = await searchParams;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  let builds;
  let nextCursor: string | null = null;

  if (params.q) {
    builds = await searchBuilds(db, params.q);
  } else {
    const result = await getBuilds(
      db,
      {
        biome: params.biome,
        houseSize: params.size,
        tag: params.tag,
      },
      (params.sort as BuildSort) || "newest",
      params.cursor,
    );
    builds = result.builds;
    nextCursor = result.nextCursor;
  }

  return (
    <div className="mx-auto max-w-[80rem] px-4 py-12">
      <Breadcrumbs items={[{ label: "Gallery" }]} />

      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Housing <span className="text-accent">Gallery</span>
        </h1>
        <p className="text-text-secondary max-w-[32rem] text-[15px]">
          Discover inspiring WoW housing builds from the community.
          Filter by biome, size, or style.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <div className="max-w-[28rem]">
          <Suspense>
            <GallerySearch />
          </Suspense>
        </div>
        <Suspense>
          <GalleryFilters />
        </Suspense>
      </div>

      {/* Results */}
      <GalleryGrid builds={builds} nextCursor={nextCursor} />
    </div>
  );
}
