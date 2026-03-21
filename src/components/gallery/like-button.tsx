"use client";

import { useState } from "react";

interface Props {
  buildId: string;
  initialCount: number;
  initialLiked?: boolean;
  size?: "sm" | "md";
}

export function LikeButton({
  buildId,
  initialCount,
  initialLiked = false,
  size = "sm",
}: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (pending) return;

    // Optimistic update
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    setPending(true);

    try {
      const res = await fetch(`/api/builds/${buildId}/like`, {
        method: "POST",
      });
      if (res.status === 401) {
        // Revert — user not logged in
        setLiked(liked);
        setCount(count);
        window.location.href = `/api/auth/discord?return=${encodeURIComponent(window.location.pathname)}`;
        return;
      }
      const data: { liked: boolean; count: number } = await res.json();
      setLiked(data.liked);
      setCount(data.count);
    } catch {
      // Revert on error
      setLiked(liked);
      setCount(count);
    } finally {
      setPending(false);
    }
  }

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5";
  const textSize = size === "sm" ? "text-[12px]" : "text-[14px]";

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1 ${textSize} transition-colors ${
        liked
          ? "text-wow-red"
          : "text-text-muted hover:text-wow-red/70"
      }`}
      title={liked ? "Unlike" : "Like"}
    >
      <svg
        className={`${iconSize} transition-transform ${pending ? "scale-125" : ""}`}
        fill={liked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={liked ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {count}
    </button>
  );
}
