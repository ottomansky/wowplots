"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BuildCard as BuildCardType } from "@/lib/db/queries";
import { BuildCard } from "./build-card";

interface Props {
  biome?: string;
  tag?: string;
  size?: string;
  limit?: number;
  viewAllHref: string;
  viewAllLabel?: string;
}

export function BuildsPreview({
  biome,
  tag,
  size,
  limit = 4,
  viewAllHref,
  viewAllLabel = "View all in gallery",
}: Props) {
  const [builds, setBuilds] = useState<BuildCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (biome) params.set("biome", biome);
    if (tag) params.set("tag", tag);
    if (size) params.set("size", size);
    params.set("limit", String(limit));
    params.set("sort", "popular");

    fetch(`/api/builds?${params}`)
      .then((r) => r.json())
      .then((data) => data as { builds: BuildCardType[] })
      .then((data) => {
        setBuilds(data.builds);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [biome, tag, size, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-bg-card overflow-hidden animate-pulse"
          >
            <div className="aspect-[16/9] bg-bg-tertiary" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-bg-tertiary rounded w-3/4" />
              <div className="h-3 bg-bg-tertiary rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (builds.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-bg-card p-8 text-center">
        <p className="text-text-secondary text-sm">
          No builds yet — check back soon!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {builds.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href={viewAllHref}
          className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
        >
          {viewAllLabel} &rarr;
        </Link>
      </div>
    </div>
  );
}
