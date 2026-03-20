import type { MetadataRoute } from "next";
import { SITE_URL, BIOMES, HOUSE_SIZES } from "@/lib/constants";
import { getArticleSlugs } from "@/lib/articles";

const STYLE_SLUGS = [
  "rustic",
  "elegant",
  "gothic",
  "nature",
  "minimalist",
  "industrial",
  "cozy",
  "tavern",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const articleUrls = getArticleSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const biomeUrls = BIOMES.map((b) => ({
    url: `${SITE_URL}/biomes/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const styleUrls = STYLE_SLUGS.map((s) => ({
    url: `${SITE_URL}/styles/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const sizeUrls = HOUSE_SIZES.map((s) => ({
    url: `${SITE_URL}/sizes/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/biomes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/styles`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/sizes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...articleUrls,
    ...biomeUrls,
    ...styleUrls,
    ...sizeUrls,
  ];
}
