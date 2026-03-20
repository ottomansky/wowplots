import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Guides & Articles",
  description:
    "WoW housing guides, biome breakdowns, decoration tips, and layout tutorials for World of Warcraft player housing.",
};

export default function BlogIndex() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <h1 className="text-4xl font-bold mb-3">
        Guides & <span className="text-accent">Articles</span>
      </h1>
      <p className="text-text-secondary mb-12 max-w-xl">
        Everything you need to know about WoW player housing — from beginner
        guides to advanced building techniques.
      </p>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-card p-12 text-center">
          <p className="text-text-secondary">
            Articles are coming soon. Check back shortly!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block rounded-xl border border-border bg-bg-card p-6 hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-accent bg-accent/10 rounded-full px-3 py-0.5 font-medium">
                  {article.category}
                </span>
                <span className="text-xs text-text-muted">
                  {article.readingTime} min read
                </span>
              </div>
              <h2 className="text-xl font-semibold group-hover:text-accent transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {article.description}
              </p>
              <div className="text-xs text-text-muted">
                {formatDate(article.publishedAt)} &middot; {article.author}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
