import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { BIOMES, SITE_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-wow-gold)_0%,_transparent_60%)] opacity-5" />

        <div className="relative mx-auto max-w-5xl px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs text-text-secondary mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-wow-green animate-pulse" />
            WoW Player Housing is live — start showcasing your builds
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-accent">Discover</span> the Most{" "}
            <br className="hidden md:block" />
            Inspiring WoW{" "}
            <span className="text-accent">Housing Builds</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            {SITE_NAME} is the community gallery for World of Warcraft player
            housing. Browse stunning builds, get decoration ideas, and share
            your own creations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-bg-primary font-semibold px-8 py-3 text-sm transition-colors"
            >
              Browse Gallery
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-border hover:border-accent text-text-primary hover:text-accent font-semibold px-8 py-3 text-sm transition-colors"
            >
              Read Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Your Housing <span className="text-accent">Inspiration Hub</span>
          </h2>
          <p className="text-text-secondary text-center max-w-xl mx-auto mb-14">
            Not a database. Not a spreadsheet. A visual gallery built for
            housing enthusiasts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Visual Gallery",
                description:
                  "Browse hundreds of housing builds with high-quality screenshots. Filter by biome, size, style, and more.",
                icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                title: "Layout Sharing",
                description:
                  "Copy layout codes directly from build pages. Import them in-game and start decorating with proven designs.",
                icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
              },
              {
                title: "Community Driven",
                description:
                  "Created by builders, for builders. Share your housing, get inspired, and connect with fellow decorators.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-bg-card p-6 hover:border-accent/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biomes Preview */}
      <section className="py-20 border-t border-border bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Explore by <span className="text-accent">Biome</span>
          </h2>
          <p className="text-text-secondary text-center max-w-xl mx-auto mb-14">
            Every neighborhood offers a unique backdrop for your builds. Find
            inspiration across all six housing biomes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BIOMES.map((biome) => (
              <Link
                key={biome.slug}
                href={`/gallery?biome=${biome.slug}`}
                className="group relative rounded-xl border border-border bg-bg-card overflow-hidden hover:border-accent/30 transition-colors"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-bg-tertiary to-bg-card" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                    {biome.name}
                  </h3>
                  <p className="text-text-muted text-xs mt-0.5">
                    {biome.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist / CTA */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Be First to <span className="text-accent">Share Your Builds</span>
          </h2>
          <p className="text-text-secondary mb-8">
            Community uploads are coming soon. Join the waitlist to be notified
            when you can submit your housing builds to the gallery.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
