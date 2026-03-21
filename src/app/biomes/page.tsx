import type { Metadata } from "next";
import Link from "next/link";
import { BIOMES } from "@/lib/constants";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "WoW Housing Biomes — All Neighborhood Types",
  description:
    "Explore all 6 World of Warcraft housing biomes. Compare Enchanted Grove, Sunlit Meadow, Twilight Thicket, Crystal Cavern, Volcanic Ridge, and Coastal Bluff.",
};

export default function BiomesIndex() {
  return (
    <div className="mx-auto max-w-[56rem] px-4 py-16">
      <Breadcrumbs items={[{ label: "Biomes" }]} />

      <h1 className="text-4xl font-bold mb-3">
        Housing <span className="text-accent">Biomes</span>
      </h1>
      <p className="text-text-secondary mb-12 max-w-[36rem]">
        Every WoW housing neighborhood is set in one of six distinct biomes.
        Explore each one to find the perfect backdrop for your builds.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BIOMES.map((biome) => (
          <Link
            key={biome.slug}
            href={`/biomes/${biome.slug}`}
            className="group rounded-xl border border-border bg-bg-card overflow-hidden hover:border-accent/30 transition-colors"
          >
            <div className="aspect-[2/1] bg-gradient-to-br from-bg-tertiary to-bg-card" />
            <div className="p-5">
              <h2 className="text-lg font-semibold group-hover:text-accent transition-colors mb-1">
                {biome.name}
              </h2>
              <p className="text-text-secondary text-sm">{biome.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
