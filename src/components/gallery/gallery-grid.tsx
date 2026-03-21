import Link from "next/link";
import type { BuildCard as BuildCardType } from "@/lib/db/queries";
import { BuildCard } from "./build-card";
import { LoadMoreButton } from "./load-more-button";
import { LogoMark } from "@/components/logo";

interface Props {
  builds: BuildCardType[];
  nextCursor: string | null;
  hasFilters?: boolean;
}

export function GalleryGrid({ builds, nextCursor, hasFilters = false }: Props) {
  if (builds.length === 0) {
    // Filtered search with no results
    if (hasFilters) {
      return (
        <div className="rounded-2xl border border-border/50 bg-bg-card/50 p-14 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-bg-tertiary flex items-center justify-center">
            <svg className="h-7 w-7 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No builds match your filters
          </h3>
          <p className="text-text-secondary text-[14px] mb-5">
            Try adjusting your filters or search to find what you&apos;re looking for.
          </p>
          <Link href="/gallery" className="btn btn-ghost text-[13px]">
            Clear all filters
          </Link>
        </div>
      );
    }

    // Gallery is genuinely empty — this is the "new site" state
    return (
      <div className="rounded-2xl border border-border bg-bg-card/30 p-16 text-center max-w-[36rem] mx-auto">
        <div className="text-accent/15 mb-6 flex justify-center">
          <LogoMark size={64} />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-text-primary mb-3">
          The gallery is just getting started
        </h3>
        <p className="text-text-secondary text-[15px] leading-relaxed mb-8 max-w-[28rem] mx-auto">
          WoWPlots is brand new. Be among the first builders to showcase your
          creations — submit your build and claim your spot as a{" "}
          <span className="text-accent font-medium">Founding Creator</span>.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/submit" className="btn btn-primary px-6 py-2.5">
            Submit Your Build
          </Link>
          <Link href="/blog" className="btn btn-secondary px-6 py-2.5">
            Browse Guides
          </Link>
        </div>
        <div className="mt-5">
          <Link
            href="https://discord.gg/mUKzQRbb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-text-muted hover:text-accent transition-colors"
          >
            Join our Discord community →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {builds.map((build, i) => (
          <div
            key={build.id}
            className="animate-in fade-in"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
          >
            <BuildCard build={build} />
          </div>
        ))}
      </div>

      {nextCursor && (
        <div className="mt-10 flex justify-center">
          <LoadMoreButton cursor={nextCursor} />
        </div>
      )}
    </div>
  );
}
