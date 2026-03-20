import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/utils";

interface Props {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="rounded-xl border border-border bg-bg-card p-4 hover:border-accent/30 transition-colors group"
          >
            <span className="text-xs text-accent bg-accent/10 rounded-full px-2 py-0.5 font-medium">
              {article.category}
            </span>
            <h3 className="font-semibold text-sm mt-2 group-hover:text-accent transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-text-muted mt-1.5">
              {formatDate(article.publishedAt)} &middot;{" "}
              {article.readingTime} min
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
