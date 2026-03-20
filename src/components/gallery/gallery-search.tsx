"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

export function GallerySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (query.trim()) {
        params.set("q", query.trim());
      }
      router.push(`/gallery?${params.toString()}`);
    },
    [query, router],
  );

  return (
    <form onSubmit={handleSubmit} className="relative">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search builds..."
        className="w-full rounded-lg border border-border bg-bg-card pl-10 pr-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted focus:border-wow-gold/50 focus:outline-none focus:ring-1 focus:ring-wow-gold/20 transition-colors"
      />
    </form>
  );
}
