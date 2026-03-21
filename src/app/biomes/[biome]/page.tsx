import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BIOMES, SITE_URL } from "@/lib/constants";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BuildsPreview } from "@/components/gallery/builds-preview";

interface Props {
  params: Promise<{ biome: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BIOMES.map((b) => ({ biome: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { biome: slug } = await params;
  const biome = BIOMES.find((b) => b.slug === slug);
  if (!biome) return {};

  return {
    title: `${biome.name} Housing Builds — WoW Housing Biome Guide`,
    description: `Explore ${biome.name} housing builds in World of Warcraft. ${biome.description}. Browse builds, get decoration ideas, and find inspiration for your ${biome.name} home.`,
    alternates: { canonical: `${SITE_URL}/biomes/${slug}` },
  };
}

const BIOME_DETAILS: Record<
  string,
  { tips: string; bestStyles: string[]; keyItems: string[]; buildIdeas: string }
> = {
  "enchanted-grove": {
    tips: "The Enchanted Grove rewards builds that embrace its natural magical atmosphere. Dark wood furniture pairs beautifully with the ambient glow of the forest. Position light sources strategically to create pools of warm light against the cool bioluminescent backdrop. Night elf and druid-themed decor is a natural fit, but don't overlook the potential for arcane libraries and magical study rooms that feel perfectly at home among the ancient trees.",
    bestStyles: ["elegant", "nature", "library", "gothic"],
    keyItems: ["Moonwell Basin", "Ancient Bark Bookshelf", "Glowcap Lantern", "Starleaf Table", "Dreamweaver Tapestry"],
    buildIdeas: "Transform your Enchanted Grove home into an ancient druid's sanctuary with a central moonwell, shelves of botanical specimens, and hanging gardens. Or go the arcane scholar route with floor-to-ceiling bookshelves, a magical workbench, and floating candles casting warm light through the mystical canopy.",
  },
  "sunlit-meadow": {
    tips: "The perpetual golden hour lighting of Sunlit Meadow makes it the most forgiving biome for new builders. Almost any warm-toned furniture looks good here. Lean into the pastoral feel with gardens, open windows, and natural materials. This biome makes outdoor spaces shine — invest decorating budget in your exterior areas for maximum impact.",
    bestStyles: ["cozy", "rustic", "garden", "tavern"],
    keyItems: ["Wildflower Planter", "Harvest Table", "Copper Lantern", "Woven Grass Rug", "Honeywood Chair"],
    buildIdeas: "Build a cozy hobbit-style cottage with a rounded doorway, a roaring fireplace, and a kitchen full of hanging herbs and copper cookware. The outdoor area is perfect for a sprawling garden with a picnic setup under a flowering tree.",
  },
  "twilight-thicket": {
    tips: "Twilight Thicket thrives on contrast. The dark environment makes any light source dramatic. Use candles, lanterns, and glowing mushrooms to create atmospheric pockets of illumination. Forsaken and void elf decor pieces are particularly striking here. Don't over-light — the beauty is in the shadows.",
    bestStyles: ["gothic", "nature", "minimalist", "themed"],
    keyItems: ["Glowshroom Cluster", "Wrought Iron Candelabra", "Shadow Silk Curtain", "Twilight Moss Carpet", "Witchwood Cauldron"],
    buildIdeas: "Create an eerie witch's cottage with a bubbling cauldron, shelves of mysterious ingredients, and windows barely letting in the dim twilight. Or build a serene mushroom garden meditation space where bioluminescent fungi provide the only light.",
  },
  "crystal-cavern": {
    tips: "Crystal Cavern is the most unique biome because there's no sky — just a crystalline ceiling that refracts light in spectacular ways. Metallic and gemstone-themed furniture naturally complements the environment. The crystal reflections can make even simple builds look magical. Use the underground river as a focal point for your outdoor area.",
    bestStyles: ["elegant", "minimalist", "industrial", "themed"],
    keyItems: ["Prismatic Crystal Lamp", "Gemstone Display Case", "Silver Ore Table", "Crystal Fountain", "Deep Earth Forge"],
    buildIdeas: "Design an arcane jeweler's workshop with display cases full of gems, a central workbench lit by crystal light, and a meditation pool beside the underground river. Or create a dwarven great hall with stone pillars, a massive forge, and treasure displays.",
  },
  "volcanic-ridge": {
    tips: "Volcanic Ridge is the most dramatic biome. The lava glow provides natural warm lighting, making dark metals and stone look incredible. Don't fight the aggressive environment — the best builds here embrace the raw power. This biome rewards industrial and forge-themed builds more than any other.",
    bestStyles: ["industrial", "horde", "themed", "gothic"],
    keyItems: ["Obsidian Anvil", "Magma Forge", "Dark Iron Chandelier", "Smoldering Brazier", "Volcanic Rock Table"],
    buildIdeas: "Build a master blacksmith's forge with multiple anvils, weapons displayed on the walls, and a lava-view window. Or create a dark war room with a massive strategy table, trophy mounts, and banners lit by the orange glow of nearby lava flows.",
  },
  "coastal-bluff": {
    tips: "Coastal Bluff is the most relaxing biome with its ocean views and bright natural lighting. Nautical and beach-themed decor is the obvious choice, and it works beautifully. The outdoor area is the star here — seaside builds with open-air spaces overlooking the ocean are consistently the most popular. Light fabrics and driftwood furniture complete the look.",
    bestStyles: ["cozy", "nature", "rustic", "minimalist"],
    keyItems: ["Driftwood Table", "Ship's Wheel Mount", "Sea Glass Lantern", "Coral Display", "Sailcloth Canopy"],
    buildIdeas: "Design a pirate captain's quarters with nautical maps, a ship's wheel, treasure chests, and a telescope aimed at the horizon. Or build a serene beach retreat with open-air dining overlooking the ocean, hammocks, and a collection of shells and sea glass.",
  },
};

export default async function BiomePage({ params }: Props) {
  const { biome: slug } = await params;
  const biome = BIOMES.find((b) => b.slug === slug);
  if (!biome) notFound();

  const details = BIOME_DETAILS[slug];

  return (
    <div className="mx-auto max-w-[48rem] px-4 py-16">
      <Breadcrumbs
        items={[
          { label: "Biomes", href: "/biomes" },
          { label: biome.name },
        ]}
      />

      <header className="mb-10">
        <div className="aspect-[3/1] rounded-xl bg-gradient-to-br from-bg-tertiary to-bg-card mb-6 flex items-center justify-center">
          <span className="text-text-muted text-sm">
            {biome.name} biome preview
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-3">
          <span className="text-accent">{biome.name}</span> Housing Builds
        </h1>
        <p className="text-lg text-text-secondary">{biome.description}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Building Tips</h2>
        <p className="text-text-secondary leading-relaxed">{details?.tips}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Best Styles</h2>
        <div className="flex flex-wrap gap-2">
          {details?.bestStyles.map((style) => (
            <Link
              key={style}
              href={`/styles/${style}`}
              className="text-sm bg-bg-card border border-border rounded-full px-4 py-1.5 text-text-secondary hover:text-accent hover:border-accent/30 transition-colors capitalize"
            >
              {style}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Key Decor Items</h2>
        <ul className="space-y-2">
          {details?.keyItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Build Ideas</h2>
        <p className="text-text-secondary leading-relaxed">
          {details?.buildIdeas}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">
          {biome.name} <span className="text-accent">Builds</span>
        </h2>
        <BuildsPreview
          biome={slug}
          limit={4}
          viewAllHref={`/gallery?biome=${slug}`}
          viewAllLabel={`View all ${biome.name} builds`}
        />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related Guides</h2>
        <div className="space-y-3">
          <Link
            href="/blog/wow-housing-biomes-compared"
            className="block text-accent hover:underline text-sm"
          >
            All 6 WoW Housing Biomes Compared
          </Link>
          <Link
            href="/blog/wow-housing-beginners-guide"
            className="block text-accent hover:underline text-sm"
          >
            WoW Player Housing: Complete Beginner&apos;s Guide
          </Link>
          <Link
            href="/blog/wow-housing-best-designs"
            className="block text-accent hover:underline text-sm"
          >
            Best WoW Housing Designs and Build Ideas
          </Link>
        </div>
      </section>
    </div>
  );
}
