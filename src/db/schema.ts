import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";

// ─── Users ──────────────────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // nanoid
  discordId: text("discord_id").notNull().unique(),
  username: text("username").notNull(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  role: text("role", { enum: ["user", "creator", "admin"] })
    .notNull()
    .default("user"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

// ─── Builds ─────────────────────────────────────────────────────────────────

export const builds = sqliteTable(
  "builds",
  {
    id: text("id").primaryKey(), // nanoid
    slug: text("slug").notNull().unique(),
    userId: text("user_id").references(() => users.id),
    title: text("title").notNull(),
    description: text("description"),
    biome: text("biome", {
      enum: [
        "enchanted-grove",
        "sunlit-meadow",
        "twilight-thicket",
        "crystal-cavern",
        "volcanic-ridge",
        "coastal-bluff",
      ],
    }),
    houseSize: text("house_size", { enum: ["small", "medium", "large"] }),
    roomCount: integer("room_count"),
    itemCount: integer("item_count"),
    layoutCode: text("layout_code"),
    status: text("status", {
      enum: ["draft", "pending", "published", "rejected"],
    })
      .notNull()
      .default("pending"),
    viewCount: integer("view_count").notNull().default(0),
    likeCount: integer("like_count").notNull().default(0),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [
    index("builds_status_idx").on(table.status),
    index("builds_biome_idx").on(table.biome),
    index("builds_user_idx").on(table.userId),
    index("builds_created_idx").on(table.createdAt),
  ]
);

// ─── Build Images ───────────────────────────────────────────────────────────

export const buildImages = sqliteTable(
  "build_images",
  {
    id: text("id").primaryKey(),
    buildId: text("build_id")
      .notNull()
      .references(() => builds.id, { onDelete: "cascade" }),
    r2Key: text("r2_key").notNull(),
    altText: text("alt_text"),
    sortOrder: integer("sort_order").notNull().default(0),
    isPrimary: integer("is_primary", { mode: "boolean" })
      .notNull()
      .default(false),
  },
  (table) => [index("build_images_build_idx").on(table.buildId)]
);

// ─── Tags ───────────────────────────────────────────────────────────────────

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category", {
    enum: ["style", "theme", "room-type", "faction"],
  }),
});

export const buildTags = sqliteTable(
  "build_tags",
  {
    buildId: text("build_id")
      .notNull()
      .references(() => builds.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.buildId, table.tagId] })]
);

// ─── Likes ──────────────────────────────────────────────────────────────────

export const likes = sqliteTable(
  "likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    buildId: text("build_id")
      .notNull()
      .references(() => builds.id, { onDelete: "cascade" }),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [primaryKey({ columns: [table.userId, table.buildId] })]
);

// ─── Bookmarks ──────────────────────────────────────────────────────────────

export const bookmarks = sqliteTable(
  "bookmarks",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    buildId: text("build_id")
      .notNull()
      .references(() => builds.id, { onDelete: "cascade" }),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [primaryKey({ columns: [table.userId, table.buildId] })]
);

// ─── Comments ───────────────────────────────────────────────────────────────

export const comments = sqliteTable(
  "comments",
  {
    id: text("id").primaryKey(),
    buildId: text("build_id")
      .notNull()
      .references(() => builds.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [index("comments_build_idx").on(table.buildId)]
);

// ─── Waitlist ───────────────────────────────────────────────────────────────

export const waitlist = sqliteTable("waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});
