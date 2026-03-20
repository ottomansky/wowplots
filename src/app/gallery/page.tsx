import type { Metadata } from "next";
import Link from "next/link";
import { BIOMES, HOUSE_SIZES, STYLE_TAGS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery — Browse WoW Housing Builds",
  description:
    "Browse the best World of Warcraft player housing builds. Filter by biome, house size, and style. Get inspired for your own WoW home.",
};

// Placeholder builds for visual layout before D1 is connected
const PLACEHOLDER_BUILDS = [
  {
    id: "1",
    title: "Enchanted Library",
    biome: "enchanted-grove",
    houseSize: "large",
    likeCount: 42,
    viewCount: 312,
    tags: ["elegant", "library"],
  },
  {
    id: "2",
    title: "Cozy Tavern",
    biome: "sunlit-meadow",
    houseSize: "medium",
    likeCount: 38,
    viewCount: 289,
    tags: ["cozy", "tavern"],
  },
  {
    id: "3",
    title: "Crystal Sanctum",
    biome: "crystal-cavern",
    houseSize: "large",
    likeCount: 56,
    viewCount: 445,
    tags: ["elegant", "minimalist"],
  },
  {
    id: "4",
    title: "Volcanic Forge",
    biome: "volcanic-ridge",
    houseSize: "small",
    likeCount: 31,
    viewCount: 198,
    tags: ["industrial", "horde"],
  },
  {
    id: "5",
    title: "Seaside Retreat",
    biome: "coastal-bluff",
    houseSize: "medium",
    likeCount: 47,
    viewCount: 367,
    tags: ["cozy", "nature"],
  },
  {
    id: "6",
    title: "Twilight Garden",
    biome: "twilight-thicket",
    houseSize: "large",
    likeCount: 63,
    viewCount: 521,
    tags: ["nature", "garden"],
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Housing <span className="text-accent">Gallery</span>
        </h1>
        <p className="text-text-secondary max-w-xl">
          Browse inspiring WoW housing builds from the community. Filter by
          biome, size, or style to find your next decoration idea.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <select className="rounded-lg border border-border bg-bg-card px-4 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
          <option value="">All Biomes</option>
          {BIOMES.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
        <select className="rounded-lg border border-border bg-bg-card px-4 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
          <option value="">All Sizes</option>
          {HOUSE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <select className="rounded-lg border border-border bg-bg-card px-4 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
          <option value="">All Styles</option>
          {STYLE_TAGS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <select className="ml-auto rounded-lg border border-border bg-bg-card px-4 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
          <option value="newest">Newest</option>
          <option value="popular">Most Liked</option>
          <option value="views">Most Viewed</option>
        </select>
      </div>

      {/* Build Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLACEHOLDER_BUILDS.map((build) => {
          const biome = BIOMES.find((b) => b.slug === build.biome);
          return (
            <Link
              key={build.id}
              href={`/gallery/${build.id}`}
              className="group rounded-xl border border-border bg-bg-card overflow-hidden hover:border-accent/30 transition-colors"
            >
              {/* Placeholder image */}
              <div className="aspect-[3/2] bg-gradient-to-br from-bg-tertiary to-bg-card relative">
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
                  Screenshot
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold group-hover:text-accent transition-colors mb-2">
                  {build.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                  <span>{biome?.name}</span>
                  <span>&middot;</span>
                  <span className="capitalize">{build.houseSize}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {build.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-bg-tertiary text-text-secondary rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {build.likeCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {build.viewCount}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-text-secondary mb-4">
          More builds coming soon. Want to submit yours?
        </p>
        <Link
          href="/#waitlist"
          className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-bg-primary font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          Join the Waitlist
        </Link>
      </div>
    </div>
  );
}
