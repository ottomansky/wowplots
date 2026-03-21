import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "WoW House Sizes — Small, Medium, and Large Compared",
  description:
    "Compare small, medium, and large houses in WoW player housing. Room counts, item budgets, unlock requirements, and tips for each size.",
};

const SIZES = [
  {
    slug: "small",
    name: "Small",
    rooms: "1 room + outdoor",
    budget: "50-100 items",
    level: "Level 1",
  },
  {
    slug: "medium",
    name: "Medium",
    rooms: "2-3 rooms + outdoor",
    budget: "150-250 items",
    level: "Level 6",
  },
  {
    slug: "large",
    name: "Large",
    rooms: "4-6 rooms + outdoor",
    budget: "350-500 items",
    level: "Level 11",
  },
];

export default function SizesIndex() {
  return (
    <div className="mx-auto max-w-[56rem] px-4 py-16">
      <Breadcrumbs items={[{ label: "Sizes" }]} />

      <h1 className="text-4xl font-bold mb-3">
        House <span className="text-accent">Sizes</span>
      </h1>
      <p className="text-text-secondary mb-12 max-w-[36rem]">
        WoW housing offers three house sizes, each with different room counts
        and decoration budgets. Compare them to find your ideal canvas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SIZES.map((size) => (
          <Link
            key={size.slug}
            href={`/sizes/${size.slug}`}
            className="group rounded-xl border border-border bg-bg-card p-6 hover:border-accent/30 transition-colors text-center"
          >
            <h2 className="text-2xl font-bold group-hover:text-accent transition-colors mb-4">
              {size.name}
            </h2>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{size.rooms}</p>
              <p className="text-accent font-medium">{size.budget}</p>
              <p className="text-text-muted">Unlocks: {size.level}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
