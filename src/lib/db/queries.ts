import { eq, desc, asc, and, sql, like, inArray } from "drizzle-orm";
import type { Database } from "@/db";
import {
  builds,
  buildImages,
  tags,
  buildTags,
  users,
} from "@/db/schema";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BuildCard {
  id: string;
  slug: string;
  title: string;
  biome: string | null;
  houseSize: string | null;
  likeCount: number;
  viewCount: number;
  createdAt: string;
  primaryImage: string | null;
  creatorName: string | null;
  tags: string[];
}

export interface BuildDetail {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  biome: string | null;
  houseSize: string | null;
  roomCount: number | null;
  itemCount: number | null;
  layoutCode: string | null;
  likeCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  creator: { id: string; username: string; avatarUrl: string | null } | null;
  images: { id: string; r2Key: string; altText: string | null; isPrimary: boolean }[];
  tags: { id: string; name: string; category: string | null }[];
}

export interface BuildFilters {
  biome?: string;
  houseSize?: string;
  tag?: string;
  status?: string;
}

export type BuildSort = "newest" | "popular" | "views";

// ─── Gallery Queries ────────────────────────────────────────────────────────

export async function getBuilds(
  db: Database,
  filters: BuildFilters = {},
  sort: BuildSort = "newest",
  cursor?: string,
  limit = 24,
): Promise<{ builds: BuildCard[]; nextCursor: string | null }> {
  // Use sql`` for enum filters to avoid strict type checking on filter strings
  const conditions = [
    sql`${builds.status} = ${filters.status || "published"}`,
  ];

  if (filters.biome) conditions.push(sql`${builds.biome} = ${filters.biome}`);
  if (filters.houseSize) conditions.push(sql`${builds.houseSize} = ${filters.houseSize}`);

  // If filtering by tag, we need a join
  let tagFilterBuildIds: string[] | null = null;
  if (filters.tag) {
    const tagRow = await db
      .select({ id: tags.id })
      .from(tags)
      .where(eq(tags.name, filters.tag))
      .limit(1);

    if (tagRow.length > 0) {
      const tagged = await db
        .select({ buildId: buildTags.buildId })
        .from(buildTags)
        .where(eq(buildTags.tagId, tagRow[0].id));
      tagFilterBuildIds = tagged.map((t) => t.buildId);
      if (tagFilterBuildIds.length === 0) {
        return { builds: [], nextCursor: null };
      }
      conditions.push(inArray(builds.id, tagFilterBuildIds));
    } else {
      return { builds: [], nextCursor: null };
    }
  }

  // Cursor pagination
  if (cursor) {
    if (sort === "newest") {
      conditions.push(sql`${builds.createdAt} < ${cursor}`);
    } else if (sort === "popular") {
      conditions.push(sql`${builds.likeCount} < ${cursor}`);
    } else {
      conditions.push(sql`${builds.viewCount} < ${cursor}`);
    }
  }

  const orderBy =
    sort === "popular"
      ? [desc(builds.likeCount), desc(builds.createdAt)]
      : sort === "views"
        ? [desc(builds.viewCount), desc(builds.createdAt)]
        : [desc(builds.createdAt)];

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
    .where(and(...conditions))
    .orderBy(...orderBy)
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;

  // Batch fetch primary images
  if (items.length > 0) {
    const ids = items.map((b) => b.id);
    const images = await db
      .select({ buildId: buildImages.buildId, r2Key: buildImages.r2Key })
      .from(buildImages)
      .where(and(inArray(buildImages.buildId, ids), eq(buildImages.isPrimary, true)));

    const imageMap = new Map(images.map((img) => [img.buildId, img.r2Key]));

    // Batch fetch tags
    const tagRows = await db
      .select({ buildId: buildTags.buildId, name: tags.name })
      .from(buildTags)
      .innerJoin(tags, eq(buildTags.tagId, tags.id))
      .where(inArray(buildTags.buildId, ids));

    const tagMap = new Map<string, string[]>();
    for (const row of tagRows) {
      const existing = tagMap.get(row.buildId) || [];
      existing.push(row.name);
      tagMap.set(row.buildId, existing);
    }

    const buildCards: BuildCard[] = items.map((b) => ({
      ...b,
      primaryImage: imageMap.get(b.id) || null,
      tags: tagMap.get(b.id) || [],
    }));

    const nextCursor = hasMore
      ? sort === "popular"
        ? String(items[items.length - 1].likeCount)
        : sort === "views"
          ? String(items[items.length - 1].viewCount)
          : items[items.length - 1].createdAt
      : null;

    return { builds: buildCards, nextCursor };
  }

  return { builds: [], nextCursor: null };
}

export async function getBuild(
  db: Database,
  slug: string,
): Promise<BuildDetail | null> {
  const rows = await db
    .select()
    .from(builds)
    .where(and(eq(builds.slug, slug), eq(builds.status, "published")))
    .limit(1);

  if (rows.length === 0) return null;
  const build = rows[0];

  // Fetch related data in parallel
  const [creator, images, buildTagRows] = await Promise.all([
    build.userId
      ? db
          .select({ id: users.id, username: users.username, avatarUrl: users.avatarUrl })
          .from(users)
          .where(eq(users.id, build.userId))
          .limit(1)
      : Promise.resolve([]),
    db
      .select()
      .from(buildImages)
      .where(eq(buildImages.buildId, build.id))
      .orderBy(asc(buildImages.sortOrder)),
    db
      .select({ id: tags.id, name: tags.name, category: tags.category })
      .from(buildTags)
      .innerJoin(tags, eq(buildTags.tagId, tags.id))
      .where(eq(buildTags.buildId, build.id)),
  ]);

  return {
    id: build.id,
    slug: build.slug,
    title: build.title,
    description: build.description,
    biome: build.biome,
    houseSize: build.houseSize,
    roomCount: build.roomCount,
    itemCount: build.itemCount,
    layoutCode: build.layoutCode,
    likeCount: build.likeCount,
    viewCount: build.viewCount,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    creator: creator[0] || null,
    images: images.map((img) => ({
      id: img.id,
      r2Key: img.r2Key,
      altText: img.altText,
      isPrimary: img.isPrimary,
    })),
    tags: buildTagRows,
  };
}

export async function getRelatedBuilds(
  db: Database,
  buildId: string,
  biome: string | null,
  tagNames: string[],
  limit = 4,
): Promise<BuildCard[]> {
  // Simple: same biome, exclude current, newest first
  const conditions = [
    sql`${builds.status} = 'published'`,
    sql`${builds.id} != ${buildId}`,
  ];
  if (biome) conditions.push(sql`${builds.biome} = ${biome}`);

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
    })
    .from(builds)
    .where(and(...conditions))
    .orderBy(desc(builds.likeCount))
    .limit(limit);

  if (rows.length === 0) return [];

  const ids = rows.map((b) => b.id);
  const images = await db
    .select({ buildId: buildImages.buildId, r2Key: buildImages.r2Key })
    .from(buildImages)
    .where(and(inArray(buildImages.buildId, ids), eq(buildImages.isPrimary, true)));

  const imageMap = new Map(images.map((img) => [img.buildId, img.r2Key]));

  return rows.map((b) => ({
    ...b,
    primaryImage: imageMap.get(b.id) || null,
    creatorName: null,
    tags: [],
  }));
}

export async function searchBuilds(
  db: Database,
  query: string,
  limit = 24,
): Promise<BuildCard[]> {
  // FTS5 search
  const ftsResults = await db.all<{ rowid: number }>(
    sql`SELECT rowid FROM builds_fts WHERE builds_fts MATCH ${query} LIMIT ${limit}`,
  );

  if (ftsResults.length === 0) {
    // Fallback to LIKE search
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
      })
      .from(builds)
      .where(
        and(
          sql`${builds.status} = 'published'`,
          like(builds.title, `%${query}%`),
        ),
      )
      .limit(limit);

    if (rows.length === 0) return [];

    const ids = rows.map((b) => b.id);
    const images = await db
      .select({ buildId: buildImages.buildId, r2Key: buildImages.r2Key })
      .from(buildImages)
      .where(and(inArray(buildImages.buildId, ids), eq(buildImages.isPrimary, true)));

    const imageMap = new Map(images.map((img) => [img.buildId, img.r2Key]));

    return rows.map((b) => ({
      ...b,
      primaryImage: imageMap.get(b.id) || null,
      creatorName: null,
      tags: [],
    }));
  }

  // FTS5 returned results — rowids map to build rowids
  // For contentless FTS5, we need to join differently
  // Actually with contentless_delete, we insert with rowid manually
  // For now, fall back to LIKE search since FTS5 contentless needs manual sync
  return [];
}

export async function incrementViewCount(db: Database, buildId: string) {
  await db
    .update(builds)
    .set({ viewCount: sql`${builds.viewCount} + 1` })
    .where(eq(builds.id, buildId));
}

// ─── Admin Mutations ────────────────────────────────────────────────────────

export async function createBuild(
  db: Database,
  data: {
    id: string;
    slug: string;
    title: string;
    description?: string;
    biome?: string;
    houseSize?: string;
    roomCount?: number;
    itemCount?: number;
    layoutCode?: string;
    status?: string;
    userId?: string;
  },
) {
  await db.insert(builds).values({
    ...data,
    status: (data.status || "published") as "draft" | "pending" | "published" | "rejected",
    biome: data.biome as typeof builds.$inferInsert.biome,
    houseSize: data.houseSize as typeof builds.$inferInsert.houseSize,
  });
}

export async function addBuildImage(
  db: Database,
  data: {
    id: string;
    buildId: string;
    r2Key: string;
    altText?: string;
    sortOrder?: number;
    isPrimary?: boolean;
  },
) {
  await db.insert(buildImages).values(data);
}

export async function ensureTag(
  db: Database,
  name: string,
  category?: string,
): Promise<string> {
  const existing = await db
    .select({ id: tags.id })
    .from(tags)
    .where(eq(tags.name, name))
    .limit(1);

  if (existing.length > 0) return existing[0].id;

  const id = crypto.randomUUID().slice(0, 21);
  await db.insert(tags).values({
    id,
    name,
    category: category as typeof tags.$inferInsert.category,
  });
  return id;
}

export async function tagBuild(db: Database, buildId: string, tagId: string) {
  await db
    .insert(buildTags)
    .values({ buildId, tagId })
    .onConflictDoNothing();
}

export async function syncBuildFts(
  db: Database,
  buildId: string,
  title: string,
  description: string,
  tagNames: string[],
) {
  // For contentless FTS5, we use explicit rowid
  const build = await db
    .select({ rowid: sql<number>`rowid` })
    .from(builds)
    .where(eq(builds.id, buildId))
    .limit(1);

  if (build.length > 0) {
    const rowid = build[0].rowid;
    await db.run(
      sql`INSERT INTO builds_fts(rowid, title, description, tags) VALUES (${rowid}, ${title}, ${description || ""}, ${tagNames.join(" ")})`,
    );
  }
}
