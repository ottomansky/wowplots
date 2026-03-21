import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "WoW Housing Styles — Build Style Guide",
  description:
    "Explore popular WoW housing build styles: rustic, elegant, gothic, nature, minimalist, industrial, cozy, and tavern. Tips and inspiration for each style.",
};

const STYLES = [
  { slug: "rustic", name: "Rustic", tagline: "Warm wood and handmade charm" },
  { slug: "elegant", name: "Elegant", tagline: "Refined and sophisticated" },
  { slug: "gothic", name: "Gothic", tagline: "Dark, dramatic, atmospheric" },
  { slug: "nature", name: "Nature", tagline: "Bringing the outdoors in" },
  { slug: "minimalist", name: "Minimalist", tagline: "Less is more" },
  { slug: "industrial", name: "Industrial", tagline: "Raw materials and function" },
  { slug: "cozy", name: "Cozy", tagline: "Warm and inviting" },
  { slug: "tavern", name: "Tavern", tagline: "Classic fantasy gathering place" },
];

export default function StylesIndex() {
  return (
    <div className="mx-auto max-w-[56rem] px-4 py-16">
      <Breadcrumbs items={[{ label: "Styles" }]} />

      <h1 className="text-4xl font-bold mb-3">
        Housing <span className="text-accent">Styles</span>
      </h1>
      <p className="text-text-secondary mb-12 max-w-[36rem]">
        From rustic cottages to elegant manors, explore every housing style and
        find the one that matches your vision.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STYLES.map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            className="group rounded-xl border border-border bg-bg-card p-5 hover:border-accent/30 transition-colors"
          >
            <h2 className="text-lg font-semibold group-hover:text-accent transition-colors mb-1">
              {style.name}
            </h2>
            <p className="text-text-secondary text-sm">{style.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
