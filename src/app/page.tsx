import Link from "next/link";
import { BIOMES, SITE_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden noise-overlay">
        {/* Atmospheric background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/80 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-5%,_var(--color-wow-gold)_0%,_transparent_55%)] opacity-[0.06]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,_var(--color-wow-gold-dark)_0%,_transparent_70%)] opacity-[0.03] animate-[glow-pulse_6s_ease-in-out_infinite]" />

        <div className="relative z-10 mx-auto max-w-[56rem] px-5 pt-28 pb-24 text-center">
          {/* Status pill */}
          <div className="animate-in-up inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/50 backdrop-blur-sm px-4 py-1.5 text-[12px] tracking-wide text-text-secondary mb-10" style={{ animationDelay: "0ms" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-wow-green" />
            WoW Player Housing is live
          </div>

          {/* Headline */}
          <h1 className="animate-in-up text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.12] tracking-[-0.025em] mb-7" style={{ animationDelay: "80ms" }}>
            Discover the most inspiring{" "}
            <span className="text-accent">WoW housing builds</span>
          </h1>

          {/* Subtext */}
          <p className="animate-in-up text-[17px] leading-relaxed text-text-secondary max-w-[32rem] mx-auto mb-10" style={{ animationDelay: "160ms" }}>
            {SITE_NAME} is the community gallery for World of Warcraft player
            housing. Browse builds, find ideas, share your creations.
          </p>

          {/* CTAs */}
          <div className="animate-in-up flex flex-col sm:flex-row items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
            <Link href="/gallery" className="btn btn-primary px-7 py-3 text-[14px]">
              Browse Gallery
            </Link>
            <Link href="/blog" className="btn btn-secondary px-7 py-3 text-[14px]">
              Read Guides
            </Link>
          </div>
        </div>

        {/* Subtle bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-[64rem] px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Your housing <span className="text-accent">inspiration hub</span>
            </h2>
            <p className="text-text-secondary text-[15px] max-w-[28rem] mx-auto">
              Not a database. Not a spreadsheet. A visual gallery built for
              housing enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Visual Gallery",
                description:
                  "Browse hundreds of builds with high-quality screenshots. Filter by biome, size, style, and more.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                ),
              },
              {
                title: "Layout Sharing",
                description:
                  "Copy layout codes from build pages. Import them in-game and start decorating with proven designs.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                ),
              },
              {
                title: "Community Driven",
                description:
                  "Created by builders, for builders. Share your housing, get inspired, and connect with fellow decorators.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM7.5 9.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                ),
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="card p-6 group"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/8 flex items-center justify-center mb-5">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-[16px] mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-text-secondary text-[13px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Biomes ───────────────────────────────────────── */}
      <section className="py-24 bg-bg-secondary/50 relative noise-overlay">
        <div className="relative z-10 mx-auto max-w-[64rem] px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Explore by <span className="text-accent">biome</span>
            </h2>
            <p className="text-text-secondary text-[15px] max-w-[28rem] mx-auto">
              Six unique neighborhoods. Six different moods. Find the backdrop
              that matches your vision.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {BIOMES.map((biome) => (
              <Link
                key={biome.slug}
                href={`/gallery?biome=${biome.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-border hover:border-border-accent transition-all duration-300"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-bg-tertiary via-bg-card to-bg-tertiary" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-accent/5 to-transparent transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-[14px] tracking-tight group-hover:text-accent transition-colors">
                    {biome.name}
                  </h3>
                  <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed line-clamp-1">
                    {biome.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community CTA ────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_var(--color-wow-gold)_0%,_transparent_70%)] opacity-[0.02]" />
        <div className="relative z-10 mx-auto max-w-[32rem] px-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Share your <span className="text-accent">housing builds</span>
          </h2>
          <p className="text-text-secondary text-[15px] mb-8 leading-relaxed">
            Sign in with Discord and showcase your creations to the WoW
            housing community. Browse, like, and bookmark your favorites.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/submit" className="btn btn-primary px-7 py-3 text-[14px]">
              Submit Your Build
            </Link>
            <Link
              href="https://discord.gg/mUKzQRbb"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-[13px]"
            >
              Join our Discord
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
