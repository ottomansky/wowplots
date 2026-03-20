import type { TocEntry } from "@/lib/articles";

interface Props {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: Props) {
  if (entries.length < 3) return null;

  return (
    <nav className="rounded-xl border border-border bg-bg-card p-5 mb-10">
      <h2 className="text-sm font-semibold text-text-primary mb-3">
        Table of Contents
      </h2>
      <ul className="space-y-1.5">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={entry.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${entry.id}`}
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
