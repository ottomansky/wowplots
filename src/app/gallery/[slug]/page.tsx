import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { getBuild, getRelatedBuilds, incrementViewCount } from "@/lib/db/queries";
import { BIOMES, SITE_NAME, SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ImageGallery } from "@/components/gallery/image-gallery";
import { LayoutCodeBlock } from "@/components/gallery/layout-code-block";
import { BuildCard } from "@/components/gallery/build-card";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const build = await getBuild(db, slug);
  if (!build) return {};

  const biome = BIOMES.find((b) => b.slug === build.biome);

  return {
    title: `${build.title} — WoW Housing Build`,
    description: build.description || `${build.title} — a ${biome?.name || ""} ${build.houseSize || ""} house build in World of Warcraft player housing.`,
    openGraph: {
      title: build.title,
      description: build.description || `A WoW housing build`,
      type: "article",
      url: `${SITE_URL}/gallery/${slug}`,
    },
    alternates: { canonical: `${SITE_URL}/gallery/${slug}` },
  };
}

export default async function BuildDetailPage({ params }: Props) {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const build = await getBuild(db, slug);
  if (!build) notFound();

  // Increment view count (fire-and-forget)
  incrementViewCount(db, build.id).catch(() => {});

  const related = await getRelatedBuilds(
    db,
    build.id,
    build.biome,
    build.tags.map((t) => t.name),
  );

  const biome = BIOMES.find((b) => b.slug === build.biome);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: build.title,
    description: build.description,
    dateCreated: build.createdAt,
    creator: build.creator
      ? { "@type": "Person", name: build.creator.username }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const images = build.images.map((img) =>
    img.r2Key.startsWith("http")
      ? img.r2Key
      : `https://placehold.co/1200x675/1c2030/f8b700?text=${encodeURIComponent(build.title)}`,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Gallery", href: "/gallery" },
          { label: build.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left: Images */}
        <div>
          <ImageGallery
            images={images.length > 0 ? images : [`https://placehold.co/1200x675/1c2030/f8b700?text=${encodeURIComponent(build.title)}`]}
            title={build.title}
          />
        </div>

        {/* Right: Info panel */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-3">{build.title}</h1>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {biome && (
                <Link
                  href={`/biomes/${biome.slug}`}
                  className="text-xs font-medium bg-wow-gold/10 text-wow-gold border border-wow-gold/20 rounded-full px-3 py-1 hover:bg-wow-gold/20 transition-colors"
                >
                  {biome.name}
                </Link>
              )}
              {build.houseSize && (
                <Link
                  href={`/sizes/${build.houseSize}`}
                  className="text-xs font-medium bg-bg-tertiary text-text-secondary border border-border rounded-full px-3 py-1 hover:border-wow-gold/30 transition-colors capitalize"
                >
                  {build.houseSize}
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-wow-red/70" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {build.likeCount} likes
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {build.viewCount} views
              </span>
              <span>{formatDate(build.createdAt)}</span>
            </div>
          </div>

          {/* Description */}
          {build.description && (
            <div className="rounded-xl border border-border bg-bg-card p-4">
              <p className="text-text-secondary text-sm leading-relaxed">
                {build.description}
              </p>
            </div>
          )}

          {/* Build details */}
          <div className="rounded-xl border border-border bg-bg-card p-4">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-medium mb-3">
              Build Details
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {build.roomCount && (
                <div>
                  <span className="text-text-muted">Rooms</span>
                  <p className="font-medium">{build.roomCount}</p>
                </div>
              )}
              {build.itemCount && (
                <div>
                  <span className="text-text-muted">Items</span>
                  <p className="font-medium">{build.itemCount}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {build.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {build.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/gallery?tag=${tag.name}`}
                  className="text-xs bg-bg-tertiary text-text-secondary rounded-full px-3 py-1 border border-border hover:border-wow-gold/30 hover:text-wow-gold transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Layout code */}
          {build.layoutCode && (
            <LayoutCodeBlock code={build.layoutCode} />
          )}

          {/* Creator */}
          {build.creator && (
            <div className="rounded-xl border border-border bg-bg-card p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted text-sm font-medium">
                {build.creator.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium">{build.creator.username}</p>
                <p className="text-xs text-text-muted">Builder</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related builds */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="text-xl font-bold mb-6">
            More {biome?.name || ""} Builds
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((build) => (
              <BuildCard key={build.id} build={build} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
