/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { users, builds, buildImages } from "@/db/schema";
import { eq, desc, and, sql, inArray } from "drizzle-orm";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BuildCard } from "@/components/gallery/build-card";
import type { BuildCard as BuildCardType } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} — Creator Profile`,
    alternates: { canonical: `${SITE_URL}/creators/${username}` },
  };
}

export default async function CreatorProfilePage({ params }: Props) {
  const { username } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  // Find user (case-insensitive)
  const userRows = await db
    .select()
    .from(users)
    .where(sql`LOWER(${users.username}) = LOWER(${username})`)
    .limit(1);

  if (userRows.length === 0) notFound();
  const creator = userRows[0];

  // Get published builds
  const creatorBuilds = await db
    .select({
      id: builds.id,
      slug: builds.slug,
      title: builds.title,
      biome: builds.biome,
      houseSize: builds.houseSize,
      likeCount: builds.likeCount,
      viewCount: builds.viewCount,
      createdAt: builds.createdAt,
    })
    .from(builds)
    .where(and(eq(builds.userId, creator.id), sql`${builds.status} = 'published'`))
    .orderBy(desc(builds.createdAt));

  // Get total likes
  const totalLikes = creatorBuilds.reduce((sum, b) => sum + b.likeCount, 0);

  // Fetch primary images
  let buildCards: BuildCardType[] = [];
  if (creatorBuilds.length > 0) {
    const ids = creatorBuilds.map((b) => b.id);
    const images = await db
      .select({ buildId: buildImages.buildId, r2Key: buildImages.r2Key })
      .from(buildImages)
      .where(and(inArray(buildImages.buildId, ids), eq(buildImages.isPrimary, true)));

    const imageMap = new Map(images.map((i) => [i.buildId, i.r2Key]));

    buildCards = creatorBuilds.map((b) => ({
      ...b,
      primaryImage: imageMap.get(b.id) || null,
      creatorName: creator.username,
      tags: [],
    }));
  }

  // Check if founding creator (first 50 users)
  const userCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(users)
    .where(sql`${users.createdAt} <= ${creator.createdAt}`);
  const isFounder = (userCount[0]?.count ?? 0) <= 50;

  return (
    <div className="mx-auto max-w-[64rem] px-5 py-12">
      <Breadcrumbs items={[{ label: "Creators" }, { label: creator.username }]} />

      {/* Profile header */}
      <div className="flex items-start gap-6 mb-10">
        {creator.avatarUrl ? (
          <img
            src={creator.avatarUrl}
            alt=""
            className="w-20 h-20 rounded-full border-2 border-border"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-bg-tertiary border-2 border-border flex items-center justify-center text-2xl font-bold text-text-muted">
            {creator.username.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            {creator.username}
            {isFounder && (
              <span className="badge badge-gold text-[10px]">Founding Creator</span>
            )}
          </h1>
          {creator.bio && (
            <p className="text-text-secondary text-[14px] mt-1 max-w-[32rem]">
              {creator.bio}
            </p>
          )}
          <div className="flex items-center gap-5 mt-3 text-[13px] text-text-muted">
            <span><strong className="text-text-primary">{creatorBuilds.length}</strong> builds</span>
            <span><strong className="text-text-primary">{totalLikes}</strong> total likes</span>
            <span>Joined {formatDate(creator.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Builds grid */}
      <h2 className="text-lg font-bold mb-5">
        Builds <span className="text-text-muted font-normal">({creatorBuilds.length})</span>
      </h2>

      {buildCards.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-text-secondary text-[14px]">
            No published builds yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {buildCards.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}
    </div>
  );
}
