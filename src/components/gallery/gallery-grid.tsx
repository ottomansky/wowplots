import type { BuildCard as BuildCardType } from "@/lib/db/queries";
import { BuildCard } from "./build-card";
import { LoadMoreButton } from "./load-more-button";

interface Props {
  builds: BuildCardType[];
  nextCursor: string | null;
}

export function GalleryGrid({ builds, nextCursor }: Props) {
  if (builds.length === 0) {
    return (
      <div className="rounded-2xl border border-border/50 bg-bg-card/50 p-16 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-bg-tertiary flex items-center justify-center">
          <svg className="h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No builds found
        </h3>
        <p className="text-text-secondary text-sm">
          Try adjusting your filters or search to find what you&apos;re looking for.
        </p>
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
