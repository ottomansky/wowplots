"use client";

import { useState } from "react";

interface Props {
  buildId: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({ buildId, initialBookmarked = false }: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [pending, setPending] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (pending) return;

    setBookmarked(!bookmarked);
    setPending(true);

    try {
      const res = await fetch(`/api/builds/${buildId}/bookmark`, {
        method: "POST",
      });
      if (res.status === 401) {
        setBookmarked(bookmarked);
        window.location.href = `/api/auth/discord?return=${encodeURIComponent(window.location.pathname)}`;
        return;
      }
      const data: { bookmarked: boolean } = await res.json();
      setBookmarked(data.bookmarked);
    } catch {
      setBookmarked(bookmarked);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 text-[13px] transition-colors ${
        bookmarked
          ? "text-accent"
          : "text-text-muted hover:text-accent/70"
      }`}
      title={bookmarked ? "Remove bookmark" : "Bookmark"}
    >
      <svg
        className={`h-4 w-4 transition-transform ${pending ? "scale-110" : ""}`}
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={bookmarked ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}
