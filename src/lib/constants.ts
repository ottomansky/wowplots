export const SITE_NAME = "WoWPlots";
export const SITE_DESCRIPTION =
  "The Pinterest of WoW Housing. Discover, showcase, and get inspired by World of Warcraft player housing builds.";
export const SITE_URL = "https://wowplots.com";

export const BIOMES = [
  {
    slug: "enchanted-grove",
    name: "Enchanted Grove",
    description: "Mystical forests with glowing flora and ancient trees",
  },
  {
    slug: "sunlit-meadow",
    name: "Sunlit Meadow",
    description: "Bright open fields bathed in golden light",
  },
  {
    slug: "twilight-thicket",
    name: "Twilight Thicket",
    description: "Shadowy woodlands with bioluminescent vegetation",
  },
  {
    slug: "crystal-cavern",
    name: "Crystal Cavern",
    description: "Underground chambers lined with gleaming crystals",
  },
  {
    slug: "volcanic-ridge",
    name: "Volcanic Ridge",
    description: "Rugged terrain with lava flows and smoldering vents",
  },
  {
    slug: "coastal-bluff",
    name: "Coastal Bluff",
    description: "Seaside cliffs with ocean views and salt-kissed air",
  },
] as const;

export const HOUSE_SIZES = ["small", "medium", "large"] as const;

export const STYLE_TAGS = [
  "rustic",
  "elegant",
  "minimalist",
  "maximalist",
  "cozy",
  "gothic",
  "nature",
  "industrial",
  "tavern",
  "library",
  "garden",
  "horde",
  "alliance",
  "neutral",
  "holiday",
  "themed",
] as const;

export const IMAGE_VARIANTS = {
  thumbnail: { width: 300, height: 200 },
  card: { width: 600, height: 400 },
  gallery: { width: 1200, height: 800 },
  full: { width: 2560, height: 1440 },
} as const;
