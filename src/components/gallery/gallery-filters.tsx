"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BIOMES, HOUSE_SIZES, STYLE_TAGS } from "@/lib/constants";

export function GalleryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBiome = searchParams.get("biome") || "";
  const currentSize = searchParams.get("size") || "";
  const currentTag = searchParams.get("tag") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("cursor"); // Reset pagination on filter change
      router.push(`/gallery?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Biome filter */}
      <select
        value={currentBiome}
        onChange={(e) => setFilter("biome", e.target.value)}
        className="input select min-w-[140px]"
      >
        <option value="">All Biomes</option>
        {BIOMES.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.name}
          </option>
        ))}
      </select>

      {/* Size filter */}
      <select
        value={currentSize}
        onChange={(e) => setFilter("size", e.target.value)}
        className="input select min-w-[120px]"
      >
        <option value="">All Sizes</option>
        {HOUSE_SIZES.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      {/* Style tag filter */}
      <select
        value={currentTag}
        onChange={(e) => setFilter("tag", e.target.value)}
        className="input select min-w-[120px]"
      >
        <option value="">All Styles</option>
        {STYLE_TAGS.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={currentSort}
        onChange={(e) => setFilter("sort", e.target.value)}
        className="ml-auto rounded-lg border border-border bg-bg-card px-3 py-2 text-[13px] text-text-primary focus:border-wow-gold/50 focus:outline-none focus:ring-1 focus:ring-wow-gold/20 transition-colors appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="newest">Newest</option>
        <option value="popular">Most Liked</option>
        <option value="views">Most Viewed</option>
      </select>

      {/* Active filter indicators */}
      {(currentBiome || currentSize || currentTag) && (
        <button
          onClick={() => router.push("/gallery")}
          className="text-[12px] text-wow-gold hover:text-wow-gold-light transition-colors underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
