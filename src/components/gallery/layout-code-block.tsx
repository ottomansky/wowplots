"use client";

import { useState } from "react";

interface Props {
  code: string;
}

export function LayoutCodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <h3 className="text-xs uppercase tracking-wider text-text-muted font-medium">
          Layout Code
        </h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-wow-gold hover:text-wow-gold-light transition-colors"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-4 max-h-32 overflow-y-auto">
        <pre className="text-[11px] text-text-muted font-mono whitespace-pre-wrap break-all leading-relaxed">
          {code.length > 500 ? code.slice(0, 500) + "..." : code}
        </pre>
      </div>
      <div className="px-4 py-2.5 border-t border-border bg-bg-secondary/50 text-center">
        <a
          href="/blog/wow-housing-layout-import-export"
          className="text-xs text-wow-gold hover:underline"
        >
          How to import this layout →
        </a>
      </div>
    </div>
  );
}
