/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  userId: string;
  username: string;
  avatarUrl: string | null;
}

interface Props {
  buildId: string;
}

export function CommentsSection({ buildId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/builds/${buildId}/comments`)
      .then((r) => r.json())
      .then((d) => d as { comments: Comment[] })
      .then((d) => {
        setComments(d.comments);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [buildId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/builds/${buildId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text.trim() }),
      });

      if (res.status === 401) {
        window.location.href = `/api/auth/discord?return=${encodeURIComponent(window.location.pathname)}`;
        return;
      }

      if (!res.ok) {
        const d: { error?: string } = await res.json();
        setError(d.error || "Failed to post comment");
        return;
      }

      const d = (await res.json()) as { comment: Comment };
      setComments([d.comment, ...comments]);
      setText("");
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-bold mb-6">
        Comments {comments.length > 0 && <span className="text-text-muted font-normal">({comments.length})</span>}
      </h2>

      {/* Empty state hint (above form) */}
      {!loading && comments.length === 0 && (
        <p className="text-text-muted text-[13px] text-center py-4 mb-4 border border-border/50 rounded-xl bg-bg-card/30">
          No comments yet — be the first to share your thoughts
        </p>
      )}

      {/* Add comment */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts on this build..."
          maxLength={1000}
          rows={3}
          className="input resize-none mb-2"
        />
        {error && <p className="text-wow-red text-[12px] mb-2">{error}</p>}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-muted">{text.length}/1000</span>
          <button
            type="submit"
            disabled={!text.trim() || submitting}
            className="btn btn-primary text-[12px] px-4 py-1.5 disabled:opacity-40"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full skeleton flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 skeleton" />
                <div className="h-4 w-full skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? null : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {comment.avatarUrl ? (
                <img
                  src={comment.avatarUrl}
                  alt=""
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-[11px] font-bold text-text-muted flex-shrink-0">
                  {comment.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-medium text-text-primary">
                    {comment.username}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
