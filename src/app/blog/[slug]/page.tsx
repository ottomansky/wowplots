import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticle, getArticleSlugs, getRelatedArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ArticleBody } from "@/components/blog/article-body";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { RelatedArticles } from "@/components/blog/related-articles";
import { Breadcrumbs } from "@/components/breadcrumbs";

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

  const related = getRelatedArticles(article);

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
    <article className="mx-auto max-w-[48rem] px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Guides", href: "/blog" },
          { label: article.title },
        ]}
      />

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

      <TableOfContents entries={article.toc} />

      <ArticleBody content={article.content} />

      <RelatedArticles articles={related} />
    </article>
  );
}
