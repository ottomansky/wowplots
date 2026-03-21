import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { bookmarks, builds, buildImages, users } from "@/db/schema";
import { eq, and, desc, inArray } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BuildCard } from "@/components/gallery/build-card";
import type { BuildCard as BuildCardType } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default async function BookmarksPage() {
  const h = await headers();
  const user = await getSession(h.get("cookie"));
  if (!user) redirect("/api/auth/discord?return=/bookmarks");

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const userBookmarks = await db
    .select({ buildId: bookmarks.buildId })
    .from(bookmarks)
    .where(eq(bookmarks.userId, user.id))
    .orderBy(desc(bookmarks.createdAt));

  let bookmarkedBuilds: BuildCardType[] = [];

  if (userBookmarks.length > 0) {
    const ids = userBookmarks.map((b) => b.buildId);
    const rows = await db
      .select({
        id: builds.id,
        slug: builds.slug,
        title: builds.title,
        biome: builds.biome,
        houseSize: builds.houseSize,
        likeCount: builds.likeCount,
        viewCount: builds.viewCount,
        createdAt: builds.createdAt,
        creatorName: users.username,
      })
      .from(builds)
      .leftJoin(users, eq(builds.userId, users.id))
      .where(inArray(builds.id, ids));

    const images = await db
      .select({ buildId: buildImages.buildId, r2Key: buildImages.r2Key })
      .from(buildImages)
      .where(and(inArray(buildImages.buildId, ids), eq(buildImages.isPrimary, true)));

    const imageMap = new Map(images.map((i) => [i.buildId, i.r2Key]));

    bookmarkedBuilds = rows.map((b) => ({
      ...b,
      primaryImage: imageMap.get(b.id) || null,
      tags: [],
    }));
  }

  return (
    <div className="mx-auto max-w-[80rem] px-5 py-12">
      <Breadcrumbs items={[{ label: "Bookmarks" }]} />
      <h1 className="text-3xl font-bold mb-8">
        Saved <span className="text-accent">Builds</span>
      </h1>

      {bookmarkedBuilds.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-text-secondary text-[15px] mb-4">
            You haven&apos;t saved any builds yet.
          </p>
          <a href="/gallery" className="btn btn-primary">
            Browse Gallery
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {bookmarkedBuilds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}
    </div>
  );
}
