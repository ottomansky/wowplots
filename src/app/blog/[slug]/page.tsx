import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ArticleBody } from "@/components/blog/article-body";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      url: `${SITE_URL}/blog/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-accent transition-colors">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{article.title}</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-accent bg-accent/10 rounded-full px-3 py-0.5 font-medium">
            {article.category}
          </span>
          <span className="text-xs text-text-muted">
            {article.readingTime} min read
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-lg text-text-secondary mb-4">
          {article.description}
        </p>
        <div className="text-sm text-text-muted">
          By {article.author} &middot; {formatDate(article.publishedAt)}
          {article.updatedAt && (
            <> &middot; Updated {formatDate(article.updatedAt)}</>
          )}
        </div>
      </header>

      <ArticleBody content={article.content} />
    </article>
  );
}
