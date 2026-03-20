"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  cursor: string;
}

export function LoadMoreButton({ cursor }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cursor", cursor);
    router.push(`/gallery?${params.toString()}`, { scroll: false });
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg border border-border hover:border-wow-gold/40 bg-bg-card hover:bg-bg-card-hover px-8 py-3 text-sm font-medium text-text-secondary hover:text-wow-gold transition-all duration-200"
    >
      Load More Builds
    </button>
  );
}
