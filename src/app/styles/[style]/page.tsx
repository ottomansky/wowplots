import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, BIOMES } from "@/lib/constants";
import { Breadcrumbs } from "@/components/breadcrumbs";

const STYLES = [
  {
    slug: "rustic",
    name: "Rustic",
    description: "Warm wood, rough-hewn stone, and handmade charm. Rustic builds feel lived-in and authentic, drawing from farmhouse and countryside aesthetics.",
    tips: "Use mismatched wooden furniture for authenticity. Hang herbs from the ceiling, stack firewood by the hearth, and scatter woven rugs across stone floors. Imperfection is the goal — avoid perfectly aligned items.",
    bestBiomes: ["sunlit-meadow", "coastal-bluff"],
    keyElements: ["Wooden beams and shelving", "Stone fireplaces", "Woven textiles and rugs", "Dried flowers and herbs", "Copper and iron cookware"],
  },
  {
    slug: "elegant",
    name: "Elegant",
    description: "Refined, polished, and sophisticated. Elegant builds feature rich fabrics, ornate furniture, and careful attention to symmetry and proportion.",
    tips: "Symmetry is key. Place matching items on either side of focal points. Use rich fabrics like velvet and silk, gold accents, and tall candelabras. Less is more — elegant builds thrive on restraint and quality over quantity.",
    bestBiomes: ["enchanted-grove", "crystal-cavern"],
    keyElements: ["Ornate furniture with gold trim", "Silk curtains and tapestries", "Crystal chandeliers", "Marble surfaces", "Art and portrait displays"],
  },
  {
    slug: "gothic",
    name: "Gothic",
    description: "Dark, dramatic, and atmospheric. Gothic builds embrace shadows, pointed arches, and a sense of mysterious grandeur.",
    tips: "Candlelight is your primary light source. Use dark metals, stone, and deep purple or red fabrics. Pointed and arched elements add authenticity. Leave some areas intentionally dark to create atmosphere.",
    bestBiomes: ["twilight-thicket", "volcanic-ridge"],
    keyElements: ["Wrought iron fixtures", "Stained glass effects", "Heavy curtains", "Skull and bone decorations", "Ancient tomes and scrolls"],
  },
  {
    slug: "nature",
    name: "Nature",
    description: "Bringing the outdoors in. Nature-themed builds blur the line between interior and exterior with living plants, water features, and organic materials.",
    tips: "Layer different types of vegetation at different heights. Use water features as centerpieces. Let plants overflow shelves and windowsills. Natural stone and untreated wood complement the greenery.",
    bestBiomes: ["enchanted-grove", "coastal-bluff", "sunlit-meadow"],
    keyElements: ["Potted plants and hanging vines", "Water features and fountains", "Natural stone arrangements", "Living walls", "Driftwood and bark decor"],
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    description: "Clean lines, open space, and intentional simplicity. Minimalist builds prove that less is more when every piece is carefully chosen.",
    tips: "Leave generous negative space. Choose a limited color palette (2-3 colors max). Every item should earn its place. Use light and shadow as decorative elements. Avoid clutter at all costs.",
    bestBiomes: ["crystal-cavern", "coastal-bluff"],
    keyElements: ["Clean-lined furniture", "Monochromatic palette", "Single statement pieces", "Intentional empty space", "Geometric shapes"],
  },
  {
    slug: "industrial",
    name: "Industrial",
    description: "Raw materials, exposed mechanisms, and functional beauty. Industrial builds celebrate the craft of making things.",
    tips: "Mix metals — iron, copper, and bronze together creates visual interest. Expose 'mechanical' elements rather than hiding them. Use anvils, gears, and tools as decorative pieces. Warm lighting softens the hard materials.",
    bestBiomes: ["volcanic-ridge", "crystal-cavern"],
    keyElements: ["Metal workbenches and anvils", "Exposed pipes and gears", "Mixed metals", "Tool displays", "Functional lighting"],
  },
  {
    slug: "cozy",
    name: "Cozy",
    description: "Warm, inviting, and comfortable. Cozy builds are places you'd want to curl up with a book and a warm drink.",
    tips: "Layer soft textures — rugs on rugs, pillows on chairs, blankets draped over everything. Warm lighting is essential. Fill bookshelves. Add a fireplace if your room supports it. Small, intimate rooms work better than large ones.",
    bestBiomes: ["sunlit-meadow", "enchanted-grove"],
    keyElements: ["Overstuffed seating", "Layered rugs and blankets", "Warm fireplace", "Bookshelves", "Warm-toned lighting"],
  },
  {
    slug: "tavern",
    name: "Tavern",
    description: "The classic fantasy gathering place. Tavern builds are lively, social spaces with character and history.",
    tips: "A bar or counter is the centerpiece. Hang mugs from hooks, stack barrels in the corner, and scatter plates on tables. A fireplace and mounted trophies add character. Slightly messy is more authentic than pristine.",
    bestBiomes: ["sunlit-meadow", "volcanic-ridge"],
    keyElements: ["Bar counter with stools", "Barrel storage", "Mounted trophies and weapons", "Hanging mugs and tankards", "Notice board"],
  },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return STYLES.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ style: string }> }): Promise<Metadata> {
  const { style: slug } = await params;
  const style = STYLES.find((s) => s.slug === slug);
  if (!style) return {};

  return {
    title: `${style.name} WoW Housing Builds — Style Guide`,
    description: `Discover ${style.name.toLowerCase()} World of Warcraft housing builds. ${style.description.slice(0, 120)}`,
    alternates: { canonical: `${SITE_URL}/styles/${slug}` },
  };
}

export default async function StylePage({ params }: { params: Promise<{ style: string }> }) {
  const { style: slug } = await params;
  const style = STYLES.find((s) => s.slug === slug);
  if (!style) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Breadcrumbs
        items={[
          { label: "Styles", href: "/styles" },
          { label: style.name },
        ]}
      />

      <h1 className="text-4xl font-bold mb-3">
        <span className="text-accent">{style.name}</span> Housing Builds
      </h1>
      <p className="text-lg text-text-secondary mb-10">{style.description}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Building Tips</h2>
        <p className="text-text-secondary leading-relaxed">{style.tips}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Key Elements</h2>
        <ul className="space-y-2">
          {style.keyElements.map((el) => (
            <li key={el} className="flex items-center gap-2 text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {el}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Best Biomes</h2>
        <div className="flex flex-wrap gap-2">
          {style.bestBiomes.map((slug) => {
            const biome = BIOMES.find((b) => b.slug === slug);
            return biome ? (
              <Link
                key={slug}
                href={`/biomes/${slug}`}
                className="text-sm bg-bg-card border border-border rounded-full px-4 py-1.5 text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
              >
                {biome.name}
              </Link>
            ) : null;
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-bg-card p-8 text-center">
        <h2 className="text-xl font-bold mb-3">
          {style.name} Builds <span className="text-accent">Coming Soon</span>
        </h2>
        <p className="text-text-secondary mb-5">
          We&apos;re curating {style.name.toLowerCase()} builds for the gallery.
        </p>
        <Link
          href="/#waitlist"
          className="rounded-lg bg-accent hover:bg-accent-hover text-bg-primary font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          Join Waitlist
        </Link>
      </section>
    </div>
  );
}
