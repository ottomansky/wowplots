/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { SessionUser } from "@/lib/auth";

export function UserMenu() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => d as { user: SessionUser | null })
      .then((d) => {
        setUser(d.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full skeleton" />;
  }

  if (!user) {
    return (
      <Link
        href="/api/auth/discord"
        className="btn btn-secondary text-[12px] px-3 py-1.5 gap-1.5"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
        </svg>
        Sign in
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-bg-tertiary/50 transition-colors"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="h-7 w-7 rounded-full"
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center text-[11px] font-bold text-accent">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden sm:inline text-[13px] text-text-secondary max-w-[100px] truncate">
          {user.username}
        </span>
        <svg
          className={`h-3 w-3 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border bg-bg-elevated shadow-xl shadow-black/30 py-1.5 z-50">
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="text-[13px] font-medium text-text-primary truncate">
              {user.username}
            </p>
            <p className="text-[11px] text-text-muted">
              {user.role === "admin" ? "Admin" : "Member"}
            </p>
          </div>
          <Link
            href={`/creators/${user.username.toLowerCase()}`}
            className="block px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50 transition-colors"
            onClick={() => setOpen(false)}
          >
            My Profile
          </Link>
          <Link
            href="/my-builds"
            className="block px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50 transition-colors"
            onClick={() => setOpen(false)}
          >
            My Builds
          </Link>
          <Link
            href="/bookmarks"
            className="block px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50 transition-colors"
            onClick={() => setOpen(false)}
          >
            Bookmarks
          </Link>
          {user.role === "admin" && (
            <Link
              href="/admin/builds"
              className="block px-3 py-2 text-[13px] text-accent hover:bg-bg-tertiary/50 transition-colors"
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          <div className="border-t border-border mt-1 pt-1">
            <a
              href="/api/auth/logout"
              className="block px-3 py-2 text-[13px] text-text-muted hover:text-wow-red transition-colors"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
