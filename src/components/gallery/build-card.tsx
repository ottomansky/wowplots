/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { BuildCard } from "@/lib/db/queries";
import { BIOMES } from "@/lib/constants";

interface Props {
  build: BuildCard;
}

export function BuildCard({ build }: Props) {
  const biome = BIOMES.find((b) => b.slug === build.biome);
  const imageUrl = build.primaryImage
    ? build.primaryImage.startsWith("http")
      ? build.primaryImage
      : `https://placehold.co/1200x675/12151e/d4a017?text=${encodeURIComponent(build.title)}`
    : `https://placehold.co/1200x675/12151e/d4a017?text=${encodeURIComponent(build.title)}`;

  return (
    <Link
      href={`/gallery/${build.slug}`}
      className="card group relative block overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-tertiary">
        <img
          src={imageUrl}
          alt={build.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />

        {/* Biome badge */}
        {biome && (
          <span className="absolute top-3 left-3 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border/50 px-2.5 py-0.5 text-[11px] font-medium text-text-secondary">
            {biome.name}
          </span>
        )}

        {/* Size badge */}
        {build.houseSize && (
          <span className="absolute top-3 right-3 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border/50 px-2.5 py-0.5 text-[11px] font-medium text-text-secondary capitalize">
            {build.houseSize}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[15px] leading-snug text-text-primary group-hover:text-wow-gold transition-colors line-clamp-1">
          {build.title}
        </h3>

        {/* Tags */}
        {build.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {build.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium uppercase tracking-wider text-text-muted bg-bg-tertiary rounded px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div className="mt-3 flex items-center justify-between text-[12px] text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-wow-red/70" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {build.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {build.viewCount}
            </span>
          </div>
          {build.creatorName && (
            <span className="text-text-muted truncate max-w-[120px]">
              by {build.creatorName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
