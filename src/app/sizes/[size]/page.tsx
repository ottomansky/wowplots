import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { HOUSE_SIZES, SITE_URL } from "@/lib/constants";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BuildsPreview } from "@/components/gallery/builds-preview";

const SIZE_DETAILS: Record<
  string,
  {
    name: string;
    rooms: string;
    budget: string;
    unlockLevel: string;
    description: string;
    pros: string[];
    cons: string[];
    tips: string;
  }
> = {
  small: {
    name: "Small",
    rooms: "1 main room + small outdoor area",
    budget: "50-100 items",
    unlockLevel: "Level 1 (starting house)",
    description:
      "Small houses are your starting point and remain popular even among experienced builders. The limited space forces creative decisions and produces some of the most focused, impactful builds. Don't underestimate the small house — constraints breed creativity.",
    pros: [
      "Easiest to fully furnish with limited items",
      "Fastest to decorate — great for experimentation",
      "Forces intentional design decisions",
      "Lower decor budget means more accessible builds",
      "Perfect for single-room themed builds (library, tavern, bedroom)",
    ],
    cons: [
      "Limited space for complex multi-room designs",
      "Outdoor area is compact",
      "Fewer room types available",
    ],
    tips: "Small houses shine when you commit to a single clear theme. A small cozy tavern or a focused alchemist's lab will always look better than trying to cram multiple ideas into a tiny space. Use vertical space aggressively — shelving, wall-mounted items, and hanging decor make small rooms feel fuller without taking up floor space.",
  },
  medium: {
    name: "Medium",
    rooms: "2-3 rooms + moderate outdoor area",
    budget: "150-250 items",
    unlockLevel: "Housing Level 6",
    description:
      "Medium houses are the sweet spot for most builders. You have enough space for distinct themed rooms while keeping the build manageable. The moderate outdoor area allows for small gardens or seating areas. Medium is where most builders settle long-term.",
    pros: [
      "Multiple rooms allow for distinct themes",
      "Enough budget for detailed decoration",
      "Outdoor area supports gardens and seating",
      "Good balance between scope and manageability",
      "Most layout codes are shared for medium houses",
    ],
    cons: [
      "Some builders find the space limiting for grand designs",
      "Requires more planning than small houses",
      "Mid-range budget means tough choices on expensive items",
    ],
    tips: "Plan your rooms before you start decorating. Sketch out what each room will be (living area, bedroom, workshop, etc.) and allocate your item budget accordingly. Create flow between rooms — a hallway connecting a kitchen to a dining room feels more natural than abruptly switching themes. The outdoor area is underutilized by most builders — make it an intentional extension of your interior design.",
  },
  large: {
    name: "Large",
    rooms: "4-6 rooms + expansive outdoor area",
    budget: "350-500 items",
    unlockLevel: "Housing Level 11",
    description:
      "Large houses are the ultimate canvas for ambitious builders. With multiple rooms and a generous outdoor area, you can create entire themed estates. However, they require significant planning and a large decor collection to fill properly. An empty large house looks worse than a well-decorated small one.",
    pros: [
      "Maximum creative freedom",
      "Multiple rooms for complex themes",
      "Expansive outdoor area for gardens, patios, or training grounds",
      "Highest item budget for maximum detail",
      "Can create connected narratives across rooms",
    ],
    cons: [
      "Requires substantial item collection to fill",
      "Can feel empty if not properly planned",
      "Takes the longest to decorate",
      "Highest housing level requirement",
      "Layout imports may require items you don't own",
    ],
    tips: "Start with one room and perfect it before moving to the next. Large houses that try to do everything at once often feel scattered. Use furniture to divide open spaces into zones. Create sight lines between rooms so visitors can see interesting details from multiple angles. Don't neglect transitions — hallways and doorways deserve decoration too.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return HOUSE_SIZES.map((size) => ({ size }));
}

export async function generateMetadata({ params }: { params: Promise<{ size: string }> }): Promise<Metadata> {
  const { size } = await params;
  const details = SIZE_DETAILS[size];
  if (!details) return {};

  return {
    title: `${details.name} WoW Houses — Size Guide and Tips`,
    description: `Everything about ${details.name.toLowerCase()} houses in WoW player housing. Rooms, item budget, unlock requirements, and building tips.`,
    alternates: { canonical: `${SITE_URL}/sizes/${size}` },
  };
}

export default async function SizePage({ params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const details = SIZE_DETAILS[size];
  if (!details) notFound();

  return (
    <div className="mx-auto max-w-[48rem] px-4 py-16">
      <Breadcrumbs
        items={[
          { label: "Sizes", href: "/sizes" },
          { label: `${details.name} Houses` },
        ]}
      />

      <h1 className="text-4xl font-bold mb-3">
        <span className="text-accent">{details.name}</span> Houses
      </h1>
      <p className="text-lg text-text-secondary mb-10">{details.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
          <p className="text-xs text-text-muted mb-1">Rooms</p>
          <p className="text-sm font-semibold">{details.rooms}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
          <p className="text-xs text-text-muted mb-1">Item Budget</p>
          <p className="text-sm font-semibold">{details.budget}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
          <p className="text-xs text-text-muted mb-1">Unlocks At</p>
          <p className="text-sm font-semibold">{details.unlockLevel}</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Advantages</h2>
        <ul className="space-y-2">
          {details.pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-text-secondary">
              <span className="text-wow-green mt-1.5 text-xs">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Limitations</h2>
        <ul className="space-y-2">
          {details.cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-text-secondary">
              <span className="text-wow-red mt-1.5 text-xs">-</span>
              {con}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Building Tips</h2>
        <p className="text-text-secondary leading-relaxed">{details.tips}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">
          {details.name} <span className="text-accent">Builds</span>
        </h2>
        <BuildsPreview
          size={size}
          limit={4}
          viewAllHref={`/gallery?size=${size}`}
          viewAllLabel={`View all ${details.name.toLowerCase()} builds`}
        />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related Guides</h2>
        <div className="space-y-3">
          <Link href="/blog/wow-housing-progression-guide" className="block text-accent hover:underline text-sm">
            WoW Housing Progression Guide: Levels, Unlocks, and Budgets
          </Link>
          <Link href="/blog/wow-housing-beginners-guide" className="block text-accent hover:underline text-sm">
            WoW Player Housing: Complete Beginner&apos;s Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
